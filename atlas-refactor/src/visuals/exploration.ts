import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {addMesh,bar,cinematicPipeline,detailedDerrick,disposeScene,line,luminous,makeDust,metal,rockMaterial,slabGeometry,surveyWaves,tube,type RockUniforms} from './cinematic';
import {contactHeight,geologicalFold,naturalSurface,rockRelief,rockFootprint} from './geology';
export type ExplorationMode='survey'|'reservoir'|'well';
export interface ExplorationState {motion:boolean;theme:string;selected:number;exploded:boolean;scanning:boolean;rotating:boolean;effects:boolean;mode:ExplorationMode}
export function createExploration(host:HTMLElement,state:()=>ExplorationState,onselect:(index:number)=>void){
  const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
  renderer.setClearColor('#050e1b');renderer.domElement.setAttribute('aria-hidden','true');host.append(renderer.domElement);
  const scene=new T.Scene();scene.background=new T.Color('#050e1b');scene.fog=new T.FogExp2('#050e1b',.016);
  const camera=new T.PerspectiveCamera(33,1,.1,180);camera.position.set(13.5,10.7,17.8);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,-.3,0);controls.enablePan=false;controls.enableDamping=false;
  controls.minDistance=12;controls.maxDistance=34;controls.minPolarAngle=.35;controls.maxPolarAngle=1.48;controls.rotateSpeed=.45;controls.zoomSpeed=.55;
  controls.update();const pipeline=cinematicPipeline(renderer,scene,camera);
  scene.add(new T.HemisphereLight('#88b7d0','#17212e',.65));
  const key=new T.DirectionalLight('#ffdbb5',2.3);key.position.set(-4,10,6);scene.add(key);
  key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=9;key.shadow.camera.bottom=-9;key.shadow.normalBias=.04;
  const rim=new T.DirectionalLight('#63c9ff',2.6);rim.position.set(4,4,-6);scene.add(rim);
  const fill=new T.PointLight('#14c9db',13,18,2);fill.position.set(2,-1.7,5);scene.add(fill);
  const world=new T.Group();scene.add(world);world.rotation.y=-.12;
  const uniforms:RockUniforms={time:{value:0},scan:{value:-1.8},selected:{value:1},reveal:{value:1}};
  const fold=geologicalFold,terrain=(x:number,z:number)=>naturalSurface(x,z)-1.15;
  const boundaries=[1.15,.05,-1.1,-2.16,-3.25],colors=['#8d826c','#606459','#ab8455','#565550'];
  const contact=(index:number,x:number,z:number)=>contactHeight(boundaries[index],index,x,z);
  const layers:T.Group[]=[],surfaces:T.Mesh[]=[],materials:T.MeshStandardMaterial[]=[];
  for(let k=0;k<4;k++){
    const group=new T.Group();world.add(group);layers.push(group);
    const mat=rockMaterial(colors[k],k,uniforms);materials.push(mat);
    const geometry=slabGeometry(9,6.1,(x,z)=>k===0?naturalSurface(x,z):contact(k,x,z),(x,z)=>contact(k+1,x,z));
    const mesh=addMesh(group,geometry,mat);mesh.userData.layer=k;surfaces.push(mesh);
  }
  const surfaceSurvey=new T.Group();layers[0].add(surfaceSurvey);
  for(let i=0;i<22;i++){
    const x=-4.05+i*.385,points:T.Vector3[]=[];
    for(let j=0;j<=65;j++){const z=-2.7+j/65*5.4;points.push(new T.Vector3(x,1.17+terrain(x,z),z));}
    line(surfaceSurvey,points,'#7bf3e6',i%5===0?.35:.09);
  }
  for(let i=0;i<14;i++){
    const z=-2.65+i*.405,points:T.Vector3[]=[];
    for(let j=0;j<=90;j++){const x=-4.05+j/90*8.1;points.push(new T.Vector3(x,1.17+terrain(x,z),z));}
    line(surfaceSurvey,points,'#67dacc',i%4===0?.3:.09);
  }
  const rig=detailedDerrick(),feet=[[-.415,-.335],[-.415,.335],[.415,-.335],[.415,.335]];
  const rigLevel=Math.max(...feet.map(([x,z])=>naturalSurface(-1.6+x,.5+z)))+.035;
  rig.group.position.set(-1.6,rigLevel,.5);rig.group.scale.setScalar(.67);layers[0].add(rig.group);
  const concrete=new T.MeshStandardMaterial({color:'#78756c',roughness:.94});
  for(const [x,z] of feet){const px=-1.6+x,pz=.5+z;bar(layers[0],[px,naturalSurface(px,pz)-.025,pz],[px,rigLevel+.07,pz],.065,concrete);}
  const debrisGeometry=new T.IcosahedronGeometry(1,1),debrisMaterial=rockMaterial('#6c756b',0,uniforms);
  const debris=new T.InstancedMesh(debrisGeometry,debrisMaterial,55),stone=new T.Object3D();layers[0].add(debris);debris.castShadow=true;debris.receiveShadow=true;
  for(let i=0;i<55;i++){const x=Math.sin(i*67.31)*3.8,z=Math.cos(i*39.1)*2.5,size=.04+.09*(Math.sin(i*37.9)*.5+.5);stone.position.set(x,1.15+terrain(x,z)+size*.4,z);stone.scale.set(size*1.4,size*.7,size);stone.rotation.set(i*.6,i*.7,i*.2);stone.updateMatrix();debris.setMatrixAt(i,stone.matrix);}
  for(let i=0;i<16;i++){const x=-3.7+i*.47,z=-1.6;addMesh(layers[0],new T.CylinderGeometry(.035,.055,.08,8),luminous('#8abbb2',.65),[x,1.2+terrain(x,z),z]);}
  const wellGroup=new T.Group();world.add(wellGroup);
  const route=[[-1.6,rigLevel+.1,.5],[-1.6,.6,1.7],[-1.55,-.4,2.75],[-1.15,-1.13,3.12],[-.1,-1.3,3.13],[1.25,-1.23,3.13],[2.7,-1.18,3.13]];
  tube(wellGroup,route,.083,metal('#314b5c'));
  const well=tube(wellGroup,route,.034,luminous('#8bfaf0',2.8));
  for(let i=0;i<9;i++){const collar=addMesh(wellGroup,new T.TorusGeometry(.102,.022,6,18),metal('#a7b9b9'),[-1.6,1.2-i*.19,1.26+i*.16]);collar.rotation.x=Math.PI/2;}
  for(let i=0;i<12;i++){const x=.4+i*.16;bar(wellGroup,[x,-1.27,3.13],[x,-.94+(i%3)*.05,3.29],.014,luminous('#efb86b',1.8));}
  const flowGeometry=new T.SphereGeometry(.041,6,6),flowMaterial=luminous('#acfff4',3.6),flows:T.Mesh[]=[];
  for(let i=0;i<23;i++)flows.push(addMesh(wellGroup,flowGeometry,flowMaterial));
  const porePositions:number[]=[];
  for(let i=0;i<1900;i++){const u=Math.sin(i*71.17),v=Math.sin(i*31.73),q=Math.cos(i*19.31);const x=.5+u*2.7,y=-1.24+v*.32,z=3.07+q*.03;if(((x-.5)/2.8)**2+((y+1.24)/.38)**2<1)porePositions.push(x,y,z);}
  const poreMaterial=new T.PointsMaterial({color:'#ffc47b',size:.025,transparent:true,opacity:.85,blending:T.AdditiveBlending,depthWrite:false});
  const pores=new T.Points(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(porePositions,3)),poreMaterial);wellGroup.add(pores);
  const migration=tube(wellGroup,[[-.5,-2.8,3.08],[-.9,-2.3,3.11],[-.5,-1.8,3.12],[.4,-1.35,3.12]],.014,luminous('#df9653',1.5));
  const waves=surveyWaves(world,new T.Vector3(-1.6,2.5,.5),7);waves.mesh.renderOrder=2;
  const scanMaterial=new T.ShaderMaterial({transparent:true,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending,
    uniforms:{uTime:{value:0}},vertexShader:'varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`uniform float uTime;varying vec2 vUv;void main(){float edge=pow(abs(vUv.x-.5)*2.,18.);float stripe=pow(max(0.,sin(vUv.y*240.-uTime*2.)),20.);float fade=sin(vUv.x*3.14159);gl_FragColor=vec4(.14,.8,.94,edge*.4+fade*(.018+stripe*.025));}`});
  const scanner=addMesh(world,new T.PlaneGeometry(7.5,7.8),scanMaterial,[0,-.1,0]);scanner.rotation.y=Math.PI/2;
  scanner.add(new T.LineSegments(new T.EdgesGeometry(scanner.geometry),new T.LineBasicMaterial({color:'#63eced',transparent:true,opacity:.27})));
  const base=new T.Group();base.position.y=-3.7;world.add(base);
  addMesh(base,slabGeometry(10.5,7.5,(x,z)=>contact(4,x,z)+3.715,(x,z)=>contact(4,x,z)+3.35-.08*rockRelief(x,z),80,48),rockMaterial('#554b3b',3,uniforms));
  const rubbleGeo=new T.DodecahedronGeometry(1,1),rubbleMat=rockMaterial('#777062',0,uniforms),rubble=new T.InstancedMesh(rubbleGeo,rubbleMat,72),rubblePoint=new T.Object3D();base.add(rubble);rubble.castShadow=true;rubble.receiveShadow=true;
  for(let i=0;i<72;i++){const edge=i%4,t=(i%18)/17,[x,z]=rockFootprint(edge===0?t:edge===1?1:edge===2?1-t:0,edge===0?0:edge===1?t:edge===2?1:1-t,9.9,7);const size=.07+.17*(Math.sin(i*89.7)*.5+.5);rubblePoint.position.set(x,contact(4,x,z)+3.74,z);rubblePoint.scale.set(size*1.7,size*.75,size);rubblePoint.rotation.set(i*.3,i*.7,i*.1);rubblePoint.updateMatrix();rubble.setMatrixAt(i,rubblePoint.matrix);}
  for(const radius of [6.45]){const ring=addMesh(world,new T.TorusGeometry(radius,.009,4,200,Math.PI*1.72),luminous('#46646a',.3),[0,-4.14,0]);ring.rotation.x=Math.PI/2;ring.rotation.z=radius*.8;}
  const ticks=new T.InstancedMesh(new T.BoxGeometry(.024,.016,.18),metal('#556765'),96),dummy=new T.Object3D();world.add(ticks);
  for(let i=0;i<96;i++){const a=i/96*Math.PI*2;dummy.position.set(Math.sin(a)*6.8,-4.12,Math.cos(a)*6.8);dummy.rotation.y=a;dummy.scale.z=i%8===0?2:1;dummy.updateMatrix();ticks.setMatrixAt(i,dummy.matrix);}
  const floor=addMesh(scene,new T.PlaneGeometry(150,150),new T.MeshStandardMaterial({color:'#24211b',metalness:0,roughness:1}),[0,-4.05,0]);floor.rotation.x=-Math.PI/2;
  const grid=new T.GridHelper(100,80,'#173b51','#102333');grid.position.y=-4.04;grid.material.transparent=true;grid.material.opacity=.09;scene.add(grid);
  const dust=makeDust(scene,750);
  let raf=0,disposed=false,inView=false,last=0,time=1.8,amount=0,lastMode:ExplorationMode='survey',flight=false,userOrbit=false,rendering=false;
  const targetPosition=new T.Vector3(),targetLook=new T.Vector3(),reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let adaptiveFrames=0,slowTime=0,effectsAffordable=true;
  function setMode(mode:ExplorationMode){const config={survey:[[13.5,10.7,17.8],[0,-.3,0]],reservoir:[[7,1.9,18],[.4,-1.3,.5]],well:[[7.4,6.5,15.5],[-.7,.3,1.1]]}[mode];targetPosition.fromArray(config[0]);targetLook.fromArray(config[1]);flight=true;userOrbit=false;}
  function render(now:number){
    raf=0;if(disposed||!inView||document.hidden)return;rendering=true;
    const s=state(),dt=Math.min(.05,(now-last)/1000||0);last=now;const moving=s.motion&&!reduced.matches;
    if(moving)time+=dt;if(s.mode!==lastMode){lastMode=s.mode;setMode(s.mode);}
    const target=s.exploded?1:s.mode==='reservoir'?.38:0;
    amount=moving?T.MathUtils.damp(amount,target,6,dt):target;if(Math.abs(target-amount)<.001)amount=target;
    layers.forEach((g,i)=>{g.position.y=(1.5-i)*amount*.85;materials[i].transparent=s.mode==='reservoir'&&i<2;materials[i].opacity=s.mode==='reservoir'&&i<2?.3:1;materials[i].depthWrite=!(s.mode==='reservoir'&&i<2);});
    wellGroup.scale.y=1+amount*.32;base.position.y=-3.7-amount*1.5;
    floor.position.y=-4.05-amount*1.5;grid.position.y=-4.04-amount*1.5;grid.visible=s.scanning;surfaceSurvey.visible=s.scanning;
    uniforms.time.value=time;uniforms.scan.value=s.scanning?Math.sin(time*.32)*4.8:10;uniforms.selected.value=s.selected;uniforms.reveal.value=s.scanning?1:0;
    scanner.visible=s.scanning;scanner.position.x=uniforms.scan.value;scanMaterial.uniforms.uTime.value=time;
    waves.mesh.visible=s.scanning;waves.material.uniforms.uTime.value=time;waves.mesh.position.y=2.55+amount*1.25;
    dust.material.uniforms.uTime.value=time;rig.travelling.position.y=2.1+(moving?Math.sin(time*.8)*.16:0);
    flows.forEach((m,i)=>{const t=(i/flows.length+time*.045)%1;m.position.copy(well.curve.getPointAt(t));m.scale.setScalar(.7+.4*Math.sin(t*Math.PI));});
    poreMaterial.opacity=.65+(moving?.15*Math.sin(time*.8):0);migration.mesh.visible=s.mode!=='well';
    if(flight){if(moving){camera.position.lerp(targetPosition,.07);controls.target.lerp(targetLook,.07);if(camera.position.distanceTo(targetPosition)<.025)flight=false;}else{camera.position.copy(targetPosition);controls.target.copy(targetLook);flight=false;}}
    controls.autoRotate=moving&&s.rotating&&!flight&&!userOrbit;controls.autoRotateSpeed=.24;controls.update(dt);
    const light=s.theme==='light';(scene.background as T.Color).set(light?'#0a1b2b':'#050e1b');(scene.fog as T.FogExp2).color.copy(scene.background as T.Color);
    pipeline.render(time,s.theme,s.effects&&effectsAffordable);
    if(moving&&adaptiveFrames<70){adaptiveFrames++;slowTime+=dt;if(adaptiveFrames===70&&slowTime/adaptiveFrames>.043){effectsAffordable=false;host.dataset.quality='balanced';}}
    host.dataset.effects=String(s.effects&&effectsAffordable);host.dataset.frame=String(Math.round(time*100));
    rendering=false;if(!raf&&(moving||flight||Math.abs(amount-target)>.001))raf=requestAnimationFrame(render);
  }
  function wake(){if(!disposed&&inView&&!document.hidden&&!raf){last=performance.now();raf=requestAnimationFrame(render);}}
  const resize=()=>{const width=host.clientWidth,height=host.clientHeight;if(!width||!height)return;pipeline.resize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();wake();};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)wake();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'80px'});visibility.observe(host);
  const changed=()=>{if(!rendering)wake();},started=()=>{userOrbit=true;flight=false;};controls.addEventListener('change',changed);controls.addEventListener('start',started);
  const visible=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();};document.addEventListener('visibilitychange',visible);reduced.addEventListener('change',wake);
  let pointer:T.Vector2|undefined;
  const down=(e:PointerEvent)=>{pointer=new T.Vector2(e.clientX,e.clientY);};
  const up=(e:PointerEvent)=>{if(!pointer||pointer.distanceTo(new T.Vector2(e.clientX,e.clientY))>5)return;pointer=undefined;const b=host.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-b.left)/b.width*2-1,1-(e.clientY-b.top)/b.height*2),camera);const hit=ray.intersectObjects(surfaces)[0];if(hit)onselect(hit.object.userData.layer);wake();};
  const keyboard=(e:KeyboardEvent)=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','Home'].includes(e.key))return;e.preventDefault();
    if(e.key==='Home'){setMode(state().mode);wake();return;}
    if(e.key==='+'||e.key==='-')camera.position.sub(controls.target).multiplyScalar(e.key==='+'?.9:1.1).clampLength(12,34).add(controls.target);
    else{const sp=new T.Spherical().setFromVector3(camera.position.clone().sub(controls.target));sp.theta+=e.key==='ArrowLeft'?-.12:e.key==='ArrowRight'?.12:0;sp.phi=T.MathUtils.clamp(sp.phi+(e.key==='ArrowUp'?-.08:e.key==='ArrowDown'?.08:0),.35,1.48);camera.position.copy(controls.target).add(new T.Vector3().setFromSpherical(sp));}
    userOrbit=true;flight=false;controls.update();wake();
  };
  renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);host.addEventListener('keydown',keyboard);resize();
  return {wake,reset(){setMode('survey');userOrbit=false;wake();},dispose(){disposed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();visibility.disconnect();controls.removeEventListener('change',changed);controls.removeEventListener('start',started);controls.dispose();document.removeEventListener('visibilitychange',visible);reduced.removeEventListener('change',wake);host.removeEventListener('keydown',keyboard);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);pipeline.dispose();disposeScene(scene);renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
}
