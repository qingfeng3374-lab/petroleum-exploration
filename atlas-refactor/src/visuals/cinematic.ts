import * as T from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {OutputPass} from 'three/addons/postprocessing/OutputPass.js';
import {SSAOPass} from 'three/addons/postprocessing/SSAOPass.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {rockFootprint,rockNoise} from './geology';

/** Shared, offline cinematic rendering. No images, models or CDN requests. */
export function cinematicPipeline(renderer:T.WebGLRenderer,scene:T.Scene,camera:T.Camera){
  renderer.outputColorSpace=T.SRGBColorSpace;
  renderer.toneMapping=T.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.12;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;
  const composer=new EffectComposer(renderer);
  const bloom=new UnrealBloomPass(new T.Vector2(800,600),.48,.65,1.04);
  const grade=new ShaderPass({uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:.24}},
    vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`uniform sampler2D tDiffuse;uniform float uTime,uVignette;varying vec2 vUv;
    void main(){vec3 c=texture2D(tDiffuse,vUv).rgb;vec2 p=vUv-.5;
      c*=1.-uVignette*smoothstep(.13,.69,length(p));
      float n=fract(sin(dot(vUv*1573.+floor(uTime*12.),vec2(12.9898,78.233)))*43758.5453);
      c+=(n-.5)*.006;gl_FragColor=vec4(c,1.);}`});
  const render=new RenderPass(scene,camera),output=new OutputPass(),occlusion=new SSAOPass(scene,camera,800,600,12);
  occlusion.kernelRadius=.7;occlusion.minDistance=.001;occlusion.maxDistance=.045;
  composer.addPass(render);composer.addPass(occlusion);composer.addPass(bloom);composer.addPass(grade);composer.addPass(output);
  const pmrem=new T.PMREMGenerator(renderer),room=new RoomEnvironment();
  const environment=pmrem.fromScene(room,.06);scene.environment=environment.texture;
  scene.environmentIntensity=.24;
  room.dispose();pmrem.dispose();
  let pixelRatio=1,lastTheme='',wide=true;
  return {
    resize(width:number,height:number){
      // Bound physical pixels, especially on retina mobile devices.
      pixelRatio=Math.min(devicePixelRatio,1.5,Math.sqrt(1_650_000/(width*height)));
      renderer.setPixelRatio(pixelRatio);renderer.setSize(width,height);
      composer.setPixelRatio(pixelRatio);composer.setSize(width,height);
      wide=width>700;occlusion.setSize(Math.round(width*pixelRatio*.7),Math.round(height*pixelRatio*.7));
    },
    render(time:number,theme:string,effects=true){
    if(theme!==lastTheme){renderer.toneMappingExposure=theme==='light'?1.14:1.06;lastTheme=theme;}
      bloom.enabled=effects;occlusion.enabled=effects&&wide;grade.uniforms.uTime.value=time;composer.render();
    },
    dispose(){bloom.dispose();occlusion.dispose();grade.dispose();output.dispose();render.dispose();composer.dispose();environment.dispose();scene.environment=null;}
  };
}

const noiseGLSL=`
float atlasHash(vec3 p){p=fract(p*.3183099+vec3(.17,.31,.57));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
float atlasNoise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(mix(atlasHash(i),atlasHash(i+vec3(1,0,0)),f.x),mix(atlasHash(i+vec3(0,1,0)),atlasHash(i+vec3(1,1,0)),f.x),f.y),
 mix(mix(atlasHash(i+vec3(0,0,1)),atlasHash(i+vec3(1,0,1)),f.x),mix(atlasHash(i+vec3(0,1,1)),atlasHash(i+vec3(1,1,1)),f.x),f.y),f.z);}
float atlasFbm(vec3 p){return .5*atlasNoise(p)+.25*atlasNoise(p*2.07)+.125*atlasNoise(p*4.13);}`;

export interface RockUniforms {time:{value:number};scan:{value:number};selected:{value:number};reveal:{value:number}}
/** Real lit stone with sedimentary bands, faults, grain and moving survey illumination. */
export function rockMaterial(color:string,index:number,shared:RockUniforms){
  const mat=new T.MeshStandardMaterial({color,roughness:.96,metalness:0,side:T.DoubleSide});
  mat.onBeforeCompile=shader=>{
    Object.assign(shader.uniforms,{uAtlasTime:shared.time,uAtlasScan:shared.scan,uAtlasSelected:shared.selected,uAtlasReveal:shared.reveal});
    shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vAtlasPosition;varying vec3 vAtlasNormal;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\nvAtlasPosition=position;vAtlasNormal=normal;');
    shader.fragmentShader=shader.fragmentShader.replace('#include <common>',`#include <common>
      varying vec3 vAtlasPosition;varying vec3 vAtlasNormal;
      uniform float uAtlasTime,uAtlasScan,uAtlasSelected,uAtlasReveal;${noiseGLSL}`)
      .replace('#include <color_fragment>',`#include <color_fragment>
        vec3 p=vAtlasPosition;float n=atlasFbm(p*3.2);
        float grain=atlasNoise(p*27.);float side=1.-smoothstep(.3,.86,abs(normalize(vAtlasNormal).y));
        float warp=atlasFbm(p*vec3(.7,.5,1.2));
        float band=sin(p.y*17.+warp*13.)*.55+sin(p.y*39.+warp*21.)*.2;
        float veins=pow(1.-abs(sin(p.x*2.1+p.y*1.9+n*9.)),24.);
        float mineral=step(.78,grain)*.13;
        diffuseColor.rgb*=.46+n*.68+grain*.19+mineral;
        diffuseColor.rgb*=1.-side*(.045+.09*band+.34*veins);
      `)
      .replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
        float relief=atlasFbm(vAtlasPosition*5.)+.12*atlasNoise(vAtlasPosition*19.);
        vec3 sx=dFdx(-vViewPosition),sy=dFdy(-vViewPosition);
        vec3 r1=cross(sy,normal),r2=cross(normal,sx);float determinant=dot(sx,r1);
        normal=normalize(abs(determinant)*normal-.018*sign(determinant)*(dFdx(relief)*r1+dFdy(relief)*r2));
      `)
      .replace('#include <emissivemap_fragment>',`#include <emissivemap_fragment>
        float scanGlow=exp(-pow((vAtlasPosition.x-uAtlasScan)*4.,2.));
        float selectedGlow=1.-step(.4,abs(uAtlasSelected-${index}.));
        totalEmissiveRadiance+=vec3(.07,.72,.67)*scanGlow*.52*uAtlasReveal;
        totalEmissiveRadiance+=diffuseColor.rgb*selectedGlow*.12;
      `);
  };
  mat.customProgramCacheKey=()=>`atlas-rock-${index}`;
  return mat;
}

export function slabGeometry(width:number,depth:number,top:(x:number,z:number)=>number,bottom:(x:number,z:number)=>number,nx=112,nz=64){
  const positions:number[]=[],indices:number[]=[];
  function point(u:number,v:number,y:(x:number,z:number)=>number){
    const [x,z]=rockFootprint(u,v,width,depth);
    return [x,y(x,z),z];
  }
  for(const [height,reverse]of [[top,false],[bottom,true]]as const){
    const base=positions.length/3;
    for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++)positions.push(...point(i/nx,j/nz,height));
    for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){
      const a=base+j*(nx+1)+i,b=a+nx+1;
      indices.push(...(reverse?[a,a+1,b+1,a,b+1,b]:[a,b+1,a+1,a,b,b+1]));
    }
  }
  for(let edge=0;edge<4;edge++){
    const steps=edge%2?nz:nx,vertical=20,base=positions.length/3;
    for(let i=0;i<=steps;i++){
      const t=i/steps,[u,v]=edge===0?[t,0]:edge===1?[1,t]:edge===2?[1-t,1]:[0,1-t];
      const a=point(u,v,top),b=point(u,v,bottom);
      for(let j=0;j<=vertical;j++){
        const h=j/vertical,y=a[1]+(b[1]-a[1])*h;
        const erosion=Math.sin(Math.PI*h)*Math.sin(Math.PI*t)*(.03+.16*rockNoise(a[0]*5,y*5,a[2]*5));
        positions.push(a[0]+(edge===1?-erosion:edge===3?erosion:0),y,a[2]+(edge===0?erosion:edge===2?-erosion:0));
        if(i&&j){const k=base+i*(vertical+1)+j;indices.push(k-vertical-2,k-1,k,k-vertical-2,k,k-vertical-1);}
      }
    }
  }
  const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setIndex(indices);geo.computeVertexNormals();return geo;
}

export const metal=(color:string,roughness=.36)=>new T.MeshStandardMaterial({color,roughness,metalness:.7});
export function luminous(color:string,intensity=2){return new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:intensity,metalness:.3,roughness:.3});}
export function addMesh(parent:T.Object3D,geometry:T.BufferGeometry,material:T.Material,position:number[]=[0,0,0]){
  const m=new T.Mesh(geometry,material);m.position.fromArray(position);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
}
export function bar(parent:T.Object3D,a:number[],b:number[],radius:number,material:T.Material){
  const from=new T.Vector3().fromArray(a),to=new T.Vector3().fromArray(b),delta=to.clone().sub(from);
  const m=addMesh(parent,new T.CylinderGeometry(radius,radius,delta.length(),8),material,from.add(to).multiplyScalar(.5).toArray());
  m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return m;
}
export function tube(parent:T.Object3D,points:number[][],radius:number,material:T.Material,segments=96){
  const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3().fromArray(p)));
  const mesh=addMesh(parent,new T.TubeGeometry(curve,segments,radius,10,false),material);return {curve,mesh};
}
export function line(parent:T.Object3D,points:T.Vector3[],color:string,opacity=1){
  const l=new T.Line(new T.BufferGeometry().setFromPoints(points),new T.LineBasicMaterial({color,transparent:true,opacity,depthWrite:false}));parent.add(l);return l;
}

/** Lattice mast, crown sheaves, travelling block, platforms, ladder and service lights. */
export function detailedDerrick(){
  const group=new T.Group(),steel=metal('#738a97'),paint=metal('#c76c34'),black=metal('#17272f');
  const light=luminous('#78f6eb',3),deck=new T.MeshStandardMaterial({color:'#42515b',metalness:.6,roughness:.5});
  addMesh(group,new T.BoxGeometry(1.65,.17,1.35),deck,[0,.1,0]);
  for(const x of [-.62,.62])for(const z of [-.5,.5]){
    bar(group,[x,.17,z],[x*.2,3.65,z*.22],.035,steel);
    addMesh(group,new T.CylinderGeometry(.075,.1,.3,10),black,[x,.15,z]);
  }
  for(let i=0;i<8;i++){
    const y=.28+i*.42,w=.63*(1-y/4),w2=.63*(1-(y+.42)/4);
    for(const z of [-1,1]){bar(group,[-w,y,z*w*.82],[w,y,z*w*.82],.021,paint);bar(group,[-w,y,z*w*.82],[w2,y+.42,z*w2*.82],.019,steel);}
    for(const x of [-1,1])bar(group,[x*w,y,-w*.82],[x*w2,y+.42,w2*.82],.018,steel);
  }
  addMesh(group,new T.BoxGeometry(.58,.15,.46),paint,[0,3.65,0]);
  for(let i=0;i<3;i++){
    const wheel=addMesh(group,new T.TorusGeometry(.105,.025,8,16),steel,[-.13+i*.13,3.8,0]);wheel.rotation.y=Math.PI/2;
    bar(group,[-.12+i*.12,.65,0],[-.12+i*.12,3.78,0],.008,black);
  }
  const travelling=addMesh(group,new T.BoxGeometry(.27,.32,.22),paint,[0,2.1,0]);
  bar(group,[0,.17,0],[0,2.0,0],.025,steel);
  for(let i=0;i<25;i++)bar(group,[-.53,.25+i*.125,-.52],[-.38,.25+i*.125,-.52],.012,steel);
  for(const y of [1.4,2.7]){
    addMesh(group,new T.BoxGeometry(.86,.06,.66),deck,[0,y,0]);
    for(const z of [-.34,.34])bar(group,[-.43,y+.22,z],[.43,y+.22,z],.014,steel);
  }
  for(const x of [-.55,.55])addMesh(group,new T.BoxGeometry(.12,.035,.045),light,[x,.25,.64]);
  addMesh(group,new T.SphereGeometry(.04,8,8),luminous('#ff8056',4),[0,3.98,0]);
  return {group,travelling};
}

export function surveyWaves(parent:T.Object3D,center:T.Vector3,radius:number){
  const material=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,
    uniforms:{uTime:{value:0},uEnabled:{value:1},uCenter:{value:center}},
    vertexShader:'varying vec3 vP;void main(){vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`uniform float uTime,uEnabled;varying vec3 vP;void main(){float d=length(vP.xz);float wave=pow(max(0.,sin(d*5.4-uTime*2.4)),18.);float fade=1.-smoothstep(.3,${radius.toFixed(1)},d);gl_FragColor=vec4(.13,.76,.84,wave*fade*.28*uEnabled);}`});
  const mesh=addMesh(parent,new T.PlaneGeometry(radius*2,radius*2),material,center.toArray());mesh.rotation.x=-Math.PI/2;
  // Plane local xy becomes horizontal after rotation, so waves use both local axes.
  material.fragmentShader=material.fragmentShader.replace('length(vP.xz)','length(vP.xy)');
  return {mesh,material};
}

export function makeDust(parent:T.Object3D,count=650){
  const p=new Float32Array(count*3);for(let i=0;i<count;i++){p[i*3]=Math.sin(i*73.19)*17;p[i*3+1]=Math.cos(i*42.31)*8+2;p[i*3+2]=Math.sin(i*15.73)*13;}
  const material=new T.ShaderMaterial({transparent:true,depthWrite:false,blending:T.AdditiveBlending,
    uniforms:{uTime:{value:0},uPixel:{value:1}},
    vertexShader:`uniform float uTime,uPixel;varying float vFade;void main(){vec3 p=position;p.y+=sin(uTime*.12+position.x)*.16;vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(22./-mv.z,1.,3.)*uPixel;vFade=.2+.5*pow(sin(position.x*31.),2.);}`,
    fragmentShader:'varying float vFade;void main(){float d=length(gl_PointCoord-.5);gl_FragColor=vec4(.42,.77,.88,smoothstep(.5,.06,d)*vFade);}'});
  const points=new T.Points(new T.BufferGeometry().setAttribute('position',new T.BufferAttribute(p,3)),material);points.frustumCulled=false;parent.add(points);return {points,material};
}

export function disposeScene(scene:T.Scene){
  const geometries=new Set<T.BufferGeometry>(),materials=new Set<T.Material>(),textures=new Set<T.Texture>();
  scene.traverse((object:any)=>{if(object.geometry)geometries.add(object.geometry);if(object.material)(Array.isArray(object.material)?object.material:[object.material]).forEach((m:T.Material)=>materials.add(m));});
  materials.forEach((m:any)=>{for(const value of Object.values(m))if(value instanceof T.Texture)textures.add(value);m.dispose();});
  geometries.forEach(g=>g.dispose());textures.forEach(t=>t.dispose());
}
