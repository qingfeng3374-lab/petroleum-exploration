import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {rockLayers,stations} from './knowledge';
import {contactHeight,geologicalFold,rockRelief} from '../visuals/geology';
import {addMesh,bar,cinematicPipeline,detailedDerrick,disposeScene,line,luminous,makeDust,metal,rockMaterial,slabGeometry,surveyWaves,tube,type RockUniforms} from '../visuals/cinematic';

export interface FieldState {selected:number;motion:boolean;theme:string;exploded:boolean;view:'all'|'surface'|'underground';effects:boolean;scanning:boolean;orbit:boolean}
export interface Projection {index:number;x:number;y:number;anchorX:number;anchorY:number;visible:boolean;labelWidth:number}
export function createFieldScene(host:HTMLElement,options:{state:()=>FieldState;labels:()=>string[];onproject:(points:Projection[])=>void;onselect:(index:number)=>void}) {
  const renderer=new T.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance',preserveDrawingBuffer:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));renderer.setClearColor(0,0);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.28;
  renderer.domElement.setAttribute('aria-hidden','true');host.prepend(renderer.domElement);
  const scene=new T.Scene();scene.background=new T.Color('#071321');const camera=new T.OrthographicCamera(-11,11,8,-8,.1,150);
  camera.position.set(17,12,20);camera.lookAt(0,-.35,0);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,-.35,0);controls.enablePan=false;controls.enableDamping=false;controls.minZoom=.65;controls.maxZoom=2.2;controls.minPolarAngle=.28;controls.maxPolarAngle=Math.PI*.48;controls.rotateSpeed=.55;controls.zoomSpeed=.7;controls.update();
  const pipeline=cinematicPipeline(renderer,scene,camera);
  const ambient=new T.HemisphereLight(0xa5d4ed,0x152a3b,.75);scene.add(ambient);
  const sun=new T.DirectionalLight(0xffd5ad,2.4);sun.position.set(-6,12,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-11,right:11,top:11,bottom:-11});sun.shadow.normalBias=.045;scene.add(sun);
  const rim=new T.DirectionalLight(0x68c8ff,2.8);rim.position.set(5,6,-8);scene.add(rim);
  const world=new T.Group();scene.add(world);
  const material=(color:string|number,metalness=0)=>new T.MeshStandardMaterial({color,metalness,roughness:metalness?.32:.71,flatShading:false});
  const cream=material('#f5e6c0'),steel=material('#496f69',.5),orange=material('#ec8148'),green=material('#249b84'),dark=material('#344841'),rubber=material('#263a33');
  function mesh(geometry:T.BufferGeometry,mat:T.Material,parent:T.Object3D,pos:number[]=[0,0,0]){const m=new T.Mesh(geometry,mat);m.position.set(pos[0],pos[1],pos[2]);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
  function box(parent:T.Object3D,pos:number[],size:number[],mat:T.Material){return mesh(new T.BoxGeometry(...size as [number,number,number]),mat,parent,pos)}
  function cylinder(parent:T.Object3D,pos:number[],radius:number,height:number,mat:T.Material){return mesh(new T.CylinderGeometry(radius,radius,height,12),mat,parent,pos)}
  function beam(parent:T.Object3D,a:number[],b:number[],radius:number,mat:T.Material){const start=new T.Vector3(...a as [number,number,number]),end=new T.Vector3(...b as [number,number,number]),delta=end.clone().sub(start);const m=cylinder(parent,start.clone().add(end).multiplyScalar(.5).toArray(),radius,delta.length(),mat);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());return m}
  function pipe(parent:T.Object3D,points:number[][],radius:number,mat:T.Material){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p as [number,number,number])));return mesh(new T.TubeGeometry(curve,56,radius,8,false),mat,parent)}
  const fold=(x:number,z:number)=>contactHeight(.5,0,x*.62,z*.9)-.5;
  const bounds=[.5,-.25,-1.3,-2.25,-3.15,-3.9],strata:T.Group[]=[];
  const rockUniforms:RockUniforms={time:{value:0},scan:{value:-4},selected:{value:0},reveal:{value:1}};
  for(let k=0;k<5;k++){
    const g=new T.Group();world.add(g);strata.push(g);
    const geo=slabGeometry(15.6,7.4,(x,z)=>bounds[k]+fold(x,z)+.09*Math.sin(x*.7+k*1.2),(x,z)=>bounds[k+1]+fold(x,z)+.09*Math.sin(x*.7+(k+1)*1.2),112,48);
    g.add(new T.Mesh(geo,rockMaterial(rockLayers[k].color,k,rockUniforms)));
  }
  // Terrain, survey receivers and surface equipment all sit on the upper rock slab.
  const surface=new T.Group();world.add(surface);
  const mountainGeometry=new T.PlaneGeometry(3.4,3.9,84,84);mountainGeometry.rotateX(-Math.PI/2);
  const mountainPositions=mountainGeometry.getAttribute('position');
  for(let i=0;i<mountainPositions.count;i++){
    const lx=mountainPositions.getX(i),lz=mountainPositions.getZ(i),x=lx-6.0,z=lz-1.1;
    const edge=Math.pow(Math.max(0,1-(lx/1.7)**2),1.6)*Math.pow(Math.max(0,1-(lz/1.95)**2),1.6);
    const ridge=.8+.65*Math.sin(lx*3.2+lz*.7)**2+.22*Math.sin(lz*5.8-lx*2.1)**2;
    mountainPositions.setXYZ(i,x,.5+fold(x,z)+edge*ridge,z);
  }
  mountainGeometry.computeVertexNormals();const mountains=addMesh(surface,mountainGeometry,rockMaterial('#77766b',0,rockUniforms));
  for(let i=0;i<10;i++){const x=-6.8+i*.38;box(surface,[x,.7+fold(x,-3.05),-3.05],[.08,.12,.08],green);if(i<9)beam(surface,[x,.73+fold(x,-3.05),-3.05],[x+.38,.73+fold(x+.38,-3.05),-3.05],.012,steel)}
  const truck=new T.Group();truck.position.set(-4.15,.73+fold(-4.15,-2.35),-2.35);surface.add(truck);box(truck,[0,.2,0],[1.4,.45,.62],cream);box(truck,[-.45,.55,0],[.5,.42,.6],orange);box(truck,[-.5,.59,.32],[.32,.2,.018],steel);for(const x of [-.45,.45])for(const z of [-.37,.37]){const w=cylinder(truck,[x,-.05,z],.18,.15,rubber);w.rotation.x=Math.PI/2}cylinder(truck,[.4,.7,0],.2,.58,steel);
  const rigBlocks:T.Mesh[]=[];
  function rig(x:number,z:number,height:number){const model=detailedDerrick();model.group.scale.setScalar(height/3.85);model.group.position.set(x,.57+fold(x,z),z);surface.add(model.group);rigBlocks.push(model.travelling);return model.group;}
  rig(-2.1,2.8,2.55);rig(3.0,-1.7,1.75);
  const cabin=new T.Group();cabin.position.set(-.25,.53+fold(-.25,.8),.8);surface.add(cabin);box(cabin,[0,.34,0],[1.45,.65,.9],cream);box(cabin,[0,.71,0],[1.55,.1,1],green);for(let i=0;i<3;i++)box(cabin,[-.45+i*.4,.39,.46],[.24,.22,.018],steel);
  const pump=new T.Group();pump.position.set(2.2,.54+fold(2.2,1.25),1.25);surface.add(pump);box(pump,[0,.08,0],[1.85,.16,.9],steel);beam(pump,[-.4,.1,0],[0,1.0,0],.065,green);beam(pump,[.4,.1,0],[0,1.0,0],.065,green);const rocker=new T.Group();rocker.position.y=1;pump.add(rocker);box(rocker,[.2,0,0],[1.75,.16,.2],orange);const horse=mesh(new T.CylinderGeometry(.38,.38,.22,18,1,false,0,Math.PI),orange,rocker,[.99,-.05,0]);horse.rotation.x=Math.PI/2;beam(pump,[.96,.1,0],[.96,1.2,0],.018,dark);cylinder(pump,[-.7,.45,0],.25,.25,dark).rotation.x=Math.PI/2;
  const plant=new T.Group();plant.position.set(5.8,.56+fold(5.8,-2.05),-2.05);surface.add(plant);box(plant,[0,.03,0],[2.8,.15,2.3],steel);for(let i=0;i<3;i++){const h=1.2+i*.48,x=-.8+i*.75;cylinder(plant,[x,h/2+.15,0],.22,h,cream);cylinder(plant,[x,h+.18,0],.25,.11,orange);for(let j=0;j<3;j++){const ring=mesh(new T.TorusGeometry(.245,.022,5,16),steel,plant,[x,.4+j*.42,0]);ring.rotation.x=Math.PI/2}pipe(plant,[[x,.2,.3],[x,.55,.62],[x+.3,.55,.65]],.04,green)}for(let i=0;i<2;i++){cylinder(plant,[-.65+i*1.2,.45,-1],.47,.75,cream);mesh(new T.SphereGeometry(.47,16,8,0,Math.PI*2,0,Math.PI/2),orange,plant,[-.65+i*1.2,.825,-1]).scale.y=.3}
  pipe(surface,[[2.8,1.4],[4.2,1.55],[6.4,1.55],[6.7,.8],[6.7,-1.2]].map(([x,z])=>[x,.78+fold(x,z),z]),.075,orange);for(let i=0;i<5;i++){const x=3.8+i*.58;box(surface,[x,.63+fold(x,1.55),1.55],[.12,.26,.35],steel);}
  const subsurface=new T.Group();world.add(subsurface);
  pipe(subsurface,[[-2.1,.7+fold(-2.1,2.8),2.8],[-2.1,-.5,3.82],[-2.05,-1.35,3.82],[-1.5,-1.72,3.82],[.1,-1.78,3.82],[1.9,-1.65,3.82]],.055,steel);
  pipe(subsurface,[[3.8,.7,2.8],[3.8,-.8,3.8],[3.6,-1.75,3.82],[2.6,-1.8,3.82]],.043,material('#b18bd5'));
  for(let i=0;i<5;i++){const ring=mesh(new T.TorusGeometry(.12,.04,7,14),cream,subsurface,[-2.1,-.15-i*.23,3.82]);ring.rotation.x=Math.PI/2}
  for(let i=0;i<8;i++){const x=.6+i*.15;beam(subsurface,[x,-1.75,3.82],[x,-1.52+(i%2)*.1,3.95],.015,orange)}
  const pores:number[]=[];for(let i=0;i<180;i++){const x=-1.6+(i%30)*.16,y=-1.28-Math.floor(i/30)*.067;if((x-.3)**2/8+(y+1.42)**2/.08<1)pores.push(x,y,3.724)}const poreGeometry=new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(pores,3));subsurface.add(new T.Points(poreGeometry,new T.PointsMaterial({color:'#ffe19a',size:.052,sizeAttenuation:true})));
  const migration=pipe(subsurface,[[-.8,-2.7,3.75],[-1.0,-2.25,3.78],[-.6,-1.75,3.78],[0,-1.45,3.78]],.015,material('#efc16f'));
  const wellheads=[[-2.1,2.8],[2.2,1.25],[3.8,2.8]];for(const [x,z] of wellheads){const ground=.5+fold(x,z);cylinder(surface,[x,ground+.24,z],.11,.48,green);beam(surface,[x-.24,ground+.38,z],[x+.24,ground+.38,z],.045,green)}
  // Precision plinth, live acquisition wavefronts and constrained flow paths.
  const pedestal=new T.Group();world.add(pedestal);pedestal.position.y=-4.25;
  const foundationAt=(x:number,z:number)=>bounds[5]+fold(x,z)+.09*Math.sin(x*.7+6)+4.25;
  addMesh(pedestal,slabGeometry(16.5,8.3,(x,z)=>foundationAt(x,z)+.015,(x,z)=>foundationAt(x,z)-.24,80,40),rockMaterial('#5c5341',4,rockUniforms));
  
  
  for(let i=0;i<36;i++){const x=-7.9+i*.45;box(pedestal,[x,.104,4.06],[.018,.014,i%5===0?.22:.1],metal('#6c97aa'));}
  for(const z of [-3.95,3.95]){bar(pedestal,[-8,.12,z],[8,.12,z],.012,luminous('#3f738a',.7));}
  const waves=surveyWaves(surface,new T.Vector3(-4.2,.82,-2.6),7.5);
  const dust=makeDust(scene,450);
  const stream=tube(surface,[[2.8,1.4],[4.2,1.55],[6.4,1.55],[6.7,.8],[6.7,-1.2]].map(([x,z])=>[x,.86+fold(x,z),z]),.022,luminous('#8aeddc',2.3));
  const streamDots:T.Mesh[]=[],dotGeometry=new T.SphereGeometry(.045,6,6),dotMaterial=luminous('#b3ffee',3);
  for(let i=0;i<22;i++)streamDots.push(addMesh(surface,dotGeometry,dotMaterial));
  // Refinery walkways, safety cages, flanges and ladders.
  for(let k=0;k<3;k++){
    const x=-.8+k*.75,h=1.2+k*.48;
    for(let y=.35;y<h;y+=.35){const ring=addMesh(plant,new T.TorusGeometry(.31,.014,6,24),metal('#7698a4'),[x,y,0]);ring.rotation.x=Math.PI/2;}
    for(const sign of [-1,1])bar(plant,[x+sign*.06,.2,.28],[x+sign*.06,h,.28],.012,steel);
    for(let j=0;j<h*9;j++)bar(plant,[x-.06,.2+j*.1,.28],[x+.06,.2+j*.1,.28],.009,steel);
    addMesh(plant,new T.SphereGeometry(.035,8,8),luminous('#ff8b55',3),[x,h+.29,0]);
  }
  const flywheel=addMesh(pump,new T.TorusGeometry(.27,.035,8,32),metal('#c58c58'),[-.7,.45,.17]);
  const crank=addMesh(pump,new T.BoxGeometry(.36,.06,.045),orange,[-.7,.45,.2]);
  for(let i=0;i<7;i++)bar(pump,[-.7,.45,.19],[-.7+Math.sin(i/7*Math.PI*2)*.25,.45+Math.cos(i/7*Math.PI*2)*.25,.19],.012,steel);
  const casingGlow=addMesh(subsurface,new T.CylinderGeometry(.025,.025,2.3,10),luminous('#7de4f2',1.6),[-2.1,-.45,3.85]);
  for(let i=0;i<15;i++){const x=-7+i*.9;bar(surface,[x,.56+fold(x,-3.2),-3.2],[x+.03,.66+fold(x,-3.2),-3.2],.016,luminous('#79dac9',1.4));}
  const markers:T.Mesh[]=[],targets:T.Object3D[]=[];
  stations.forEach((s,index)=>{const marker=mesh(new T.SphereGeometry(.085,12,10),new T.MeshBasicMaterial({color:s.color}),world,[...s.position]);marker.userData.index=index;markers.push(marker);const pick=mesh(new T.SphereGeometry(.35,8,8),new T.MeshBasicMaterial({visible:false}),world,[...s.position]);pick.userData.index=index;targets.push(pick)});
  const halo=new T.Group();world.add(halo);for(let i=0;i<2;i++){const ring=mesh(new T.TorusGeometry(.22+i*.14,.012,6,36),new T.MeshBasicMaterial({color:'#ffca75',transparent:true,opacity:.9-i*.35}),halo);ring.rotation.x=Math.PI/2}
  const grid=new T.GridHelper(32,48,'#265b78','#1b3a50');grid.position.y=-4.5;grid.material.transparent=true;grid.material.opacity=.13;scene.add(grid);
  const offsets=[[-26,-25],[-15,-42],[-45,-62],[35,-12],[-100,-15],[-70,32],[-40,65],[25,50],[25,-22],[25,-36],[75,50],[30,0],[20,-45]];
  const measure=document.createElement('canvas').getContext('2d');
  const cameraDestination=new T.Vector3(),lookDestination=new T.Vector3();let zoomDestination=1,cameraFlight=false;
  let width=800,height=650,raf=0,disposed=false,inView=false,rendering=false,last=0,time=1.8,amount=0,lastView='all',initial=true,dirty=true,dragStart:T.Vector2|null=null;
  function project(){
    const labels=options.labels();if(measure)measure.font='600 15px '+getComputedStyle(host).fontFamily;
    const points=markers.map((marker,index)=>{const p=marker.position.clone().project(camera),anchorX=(p.x+1)/2*width,anchorY=(1-p.y)/2*height,labelWidth=width<600?36:Math.max(96,Math.min(185,Math.ceil(measure?.measureText(labels[index]||'').width||(labels[index]||'').length*10)+44)),padding=labelWidth/2+8;return {index,x:T.MathUtils.clamp(anchorX+offsets[index][0],padding,width-padding),y:T.MathUtils.clamp(anchorY+offsets[index][1],55,height-38),anchorX,anchorY,visible:p.z>-1&&p.z<1,labelWidth}});
    for(let pass=0;pass<12;pass++)for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j];if(Math.abs(a.x-b.x)<(a.labelWidth+b.labelWidth)/2+5&&Math.abs(a.y-b.y)<37){const push=(37-Math.abs(a.y-b.y))/2+.2,sign=a.y<=b.y?-1:1;a.y=T.MathUtils.clamp(a.y+push*sign,55,height-38);b.y=T.MathUtils.clamp(b.y-push*sign,55,height-38)}}
    options.onproject(points.map(p=>({...p,x:Math.round(p.x),y:Math.round(p.y),anchorX:Math.round(p.anchorX),anchorY:Math.round(p.anchorY)})));
  }
  function render(now:number){raf=0;if(disposed||!inView||document.hidden)return;rendering=true;const state=options.state(),dt=Math.min(.05,(now-last)/1000||0);last=now;const moving=state.motion&&!reduced.matches;
    if(moving)time+=dt;
    const target=state.exploded?1:0;amount=moving?T.MathUtils.lerp(amount,target,.12):target;if(Math.abs(amount-target)<.001)amount=target;
    strata.forEach((g,i)=>g.position.y=-i*.42*amount);subsurface.scale.y=1+amount*.45;grid.position.y=-4.8-amount*1.8;pedestal.position.y=-4.25-amount*1.8;
    rockUniforms.time.value=time;rockUniforms.scan.value=state.scanning?Math.sin(time*.32)*8.1:20;rockUniforms.reveal.value=state.scanning?1:0;
    rockUniforms.selected.value=state.selected<4?0:state.selected<6?1:state.selected<11?2:3;
    waves.mesh.visible=state.scanning;waves.material.uniforms.uTime.value=time;dust.material.uniforms.uTime.value=time;
    rigBlocks.forEach((block,i)=>block.position.y=2.1+(moving?Math.sin(time*.7+i)*.13:0));
    streamDots.forEach((m,i)=>m.position.copy(stream.curve.getPointAt((i/streamDots.length+time*.065)%1)));
    crank.rotation.z=time*1.4;flywheel.rotation.z=time*1.4;
    controls.autoRotate=moving&&state.orbit;controls.autoRotateSpeed=.22;
    markers.forEach((marker,index)=>{marker.position.y=stations[index].position[1]*(stations[index].position[1]<0?1+amount*.45:1);targets[index].position.copy(marker.position)});
    halo.position.copy(markers[state.selected]?.position||markers[0].position);halo.rotation.y=time*.3;halo.scale.setScalar(moving?1+.12*Math.sin(time*2):1);rocker.rotation.z=moving?Math.sin(time*1.4)*.15:0;migration.visible=state.view!=='surface';
    if(initial||state.view!==lastView){lastView=state.view;const views={all:{position:[17,12,20],target:[0,-.35,0],zoom:1},surface:{position:[12,17,15],target:[0,.7,0],zoom:1.12},underground:{position:[7,3.8,24],target:[0,-1.65,0],zoom:1.13}};const v=views[state.view];cameraDestination.fromArray(v.position);lookDestination.fromArray(v.target);zoomDestination=v.zoom;if(initial||!moving){camera.position.copy(cameraDestination);controls.target.copy(lookDestination);camera.zoom=zoomDestination;camera.updateProjectionMatrix();controls.update();cameraFlight=false;}else cameraFlight=true;initial=false;dirty=true}
    if(cameraFlight){
      if(moving){camera.position.lerp(cameraDestination,.085);controls.target.lerp(lookDestination,.085);camera.zoom=T.MathUtils.lerp(camera.zoom,zoomDestination,.085);if(camera.position.distanceTo(cameraDestination)<.02)cameraFlight=false;}
      else{camera.position.copy(cameraDestination);controls.target.copy(lookDestination);camera.zoom=zoomDestination;cameraFlight=false;}
      camera.updateProjectionMatrix();dirty=true;
    }
    ambient.intensity=state.theme==='light'?.85:.65;
    controls.update(dt);scene.updateMatrixWorld();camera.updateMatrixWorld();pipeline.render(time,state.theme,state.effects);if(dirty||amount!==target||state.orbit&&moving){project();dirty=false}
    rendering=false;if(!raf&&(moving||amount!==target||cameraFlight))raf=requestAnimationFrame(render);
  }
  function wake(){dirty=true;if(!disposed&&inView&&!document.hidden&&!raf){last=performance.now();raf=requestAnimationFrame(render)}}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const resize=()=>{width=host.clientWidth;height=host.clientHeight;if(!width||!height)return;pipeline.resize(width,height);const half=Math.max(7.7,9.5*height/width);camera.left=-half*width/height;camera.right=half*width/height;camera.top=half;camera.bottom=-half;camera.updateProjectionMatrix();wake()};
  const observer=new ResizeObserver(resize);observer.observe(host);
  const visibility=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;if(inView)wake();else{cancelAnimationFrame(raf);raf=0}},{rootMargin:'120px'});visibility.observe(host);
  const changed=()=>{dirty=true;if(!rendering)wake()};controls.addEventListener('change',changed);const visible=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else wake()};document.addEventListener('visibilitychange',visible);reduced.addEventListener('change',wake);
  const down=(e:PointerEvent)=>{cameraFlight=false;dragStart=new T.Vector2(e.clientX,e.clientY)};
  const up=(e:PointerEvent)=>{if(!dragStart||dragStart.distanceTo(new T.Vector2(e.clientX,e.clientY))>6)return;const r=renderer.domElement.getBoundingClientRect(),ray=new T.Raycaster();ray.setFromCamera(new T.Vector2((e.clientX-r.left)/r.width*2-1,1-(e.clientY-r.top)/r.height*2),camera);const hit=ray.intersectObjects(targets)[0];if(hit)options.onselect(hit.object.userData.index);dragStart=null};
  const key=(event:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','Home'].includes(event.key))return;event.preventDefault();if(event.key==='Home'){initial=true;wake();return}if(event.key==='+'||event.key==='-')camera.zoom=T.MathUtils.clamp(camera.zoom+(event.key==='+'?.12:-.12),.65,2.2);else{const offset=camera.position.clone().sub(controls.target),spherical=new T.Spherical().setFromVector3(offset);spherical.theta+=event.key==='ArrowLeft'?-.12:event.key==='ArrowRight'?.12:0;spherical.phi=T.MathUtils.clamp(spherical.phi+(event.key==='ArrowUp'?-.09:event.key==='ArrowDown'?.09:0),.28,Math.PI*.48);camera.position.copy(controls.target).add(new T.Vector3().setFromSpherical(spherical))}camera.updateProjectionMatrix();controls.update();wake()};
  renderer.domElement.addEventListener('pointerdown',down);renderer.domElement.addEventListener('pointerup',up);host.addEventListener('keydown',key);resize();
  return {wake,reset:()=>{initial=true;wake()},zoom:(delta:number)=>{camera.zoom=T.MathUtils.clamp(camera.zoom+delta,.65,2.2);camera.updateProjectionMatrix();wake()},dispose:()=>{disposed=true;cancelAnimationFrame(raf);observer.disconnect();visibility.disconnect();controls.removeEventListener('change',changed);controls.dispose();document.removeEventListener('visibilitychange',visible);reduced.removeEventListener('change',wake);host.removeEventListener('keydown',key);renderer.domElement.removeEventListener('pointerdown',down);renderer.domElement.removeEventListener('pointerup',up);pipeline.dispose();disposeScene(scene);renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()}};
}
