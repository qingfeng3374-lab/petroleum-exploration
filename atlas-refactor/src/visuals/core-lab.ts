import * as T from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {addMesh,bar,cinematicPipeline,disposeScene,luminous,metal,rockMaterial,type RockUniforms} from './cinematic';
import {rockNoise} from './geology';
export type CoreMode='surface'|'pores'|'split';
export function createCoreLab(host:HTMLElement,state:()=>{mode:CoreMode;motion:boolean;theme:string}){
  const renderer=new T.WebGLRenderer({antialias:true,powerPreference:'low-power',preserveDrawingBuffer:true});
  renderer.domElement.setAttribute('aria-hidden','true');host.prepend(renderer.domElement);
  const scene=new T.Scene();scene.background=new T.Color('#091724');scene.fog=new T.FogExp2('#091724',.052);
  const camera=new T.PerspectiveCamera(32,1,.1,80);camera.position.set(3.4,3.4,8.4);
  const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,-.1,0);controls.enablePan=false;controls.enableDamping=false;controls.minDistance=6;controls.maxDistance=20;controls.minPolarAngle=.4;controls.maxPolarAngle=1.7;controls.rotateSpeed=.45;
  controls.update();const pipeline=cinematicPipeline(renderer,scene,camera);
  scene.add(new T.HemisphereLight('#b6cbdf','#2d281e',.85));
  const key=new T.DirectionalLight('#ffe6c7',3.1);key.position.set(-3,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-6,right:6,top:6,bottom:-6});key.shadow.normalBias=.035;scene.add(key);
  const rim=new T.DirectionalLight('#71b8d0',1.8);rim.position.set(3,3,-5);scene.add(rim);
  const uniforms:RockUniforms={time:{value:0},scan:{value:20},selected:{value:-1},reveal:{value:0}};
  const colors=['#ac9776','#887c61','#b7a07c'],groups:T.Group[]=[],shells:T.Mesh[]=[],pores:T.Group[]=[],centers=[-1.8,0,1.8];
  for(let k=0;k<3;k++){
    const group=new T.Group();group.position.x=centers[k];group.position.y=.2;scene.add(group);groups.push(group);
    const geometry=new T.CylinderGeometry(.7,.7,1.74,72,32,false),position=geometry.getAttribute('position');
    for(let i=0;i<position.count;i++){
      const x=position.getX(i),y=position.getY(i),z=position.getZ(i),r=Math.hypot(x,z);
      if(r>.2){const a=Math.atan2(z,x),w=rockNoise(x*11+k*7,y*9,z*11),chip=Math.abs(y)>.77?.055*rockNoise(x*21,k,z*21):0;const radius=1+(w-.5)*.045-chip;position.setXYZ(i,x*radius,y+Math.sign(y)*chip*.35,z*radius);}
    }
    geometry.computeVertexNormals();geometry.rotateZ(-Math.PI/2);
    const shell=addMesh(group,geometry,rockMaterial(colors[k],k,uniforms));shells.push(shell);
    const poreGroup=new T.Group();group.add(poreGroup);pores.push(poreGroup);
    const poreMaterial=new T.MeshStandardMaterial({color:'#d8aa65',emissive:'#a96b2b',emissiveIntensity:.5,roughness:.57});
    const bubbles=new T.InstancedMesh(new T.SphereGeometry(1,7,6),poreMaterial,130),dummy=new T.Object3D(),poreCenters:T.Vector3[]=[];poreGroup.add(bubbles);
    for(let j=0;j<130;j++){
      const angle=j*2.39996,r=.56*Math.sqrt((Math.sin(j*83.2+k)*.5+.5)),x=Math.sin(j*31.13+k)*.78,size=.018+.048*rockNoise(j*.7,k,3);
      dummy.position.set(x,Math.sin(angle)*r,Math.cos(angle)*r);poreCenters.push(dummy.position.clone());dummy.scale.set(size*1.6,size,size*.7);dummy.updateMatrix();bubbles.setMatrixAt(j,dummy.matrix);
    }
    // Pore bodies and connecting throats form a conceptual pore-network representation.
    const throats:number[]=[];
    poreCenters.forEach((p,i)=>{const neighbors=poreCenters.map((q,j)=>({j,d:q.distanceToSquared(p)})).filter(q=>q.j>i&&q.d<.105).sort((a,b)=>a.d-b.d).slice(0,2);for(const q of neighbors)throats.push(...p.toArray(),...poreCenters[q.j].toArray());});
    poreGroup.add(new T.LineSegments(new T.BufferGeometry().setAttribute('position',new T.Float32BufferAttribute(throats,3)),new T.LineBasicMaterial({color:'#a7c5b8',transparent:true,opacity:.55})));
    // Small dark pits sit in the external rock skin; the internal pores remain a conceptual view.
    const pitMaterial=new T.MeshStandardMaterial({color:'#332d24',roughness:1,side:T.DoubleSide});
    for(let j=0;j<13;j++){
      const a=j*2.39996,normal=new T.Vector3(0,Math.sin(a),Math.cos(a)),x=Math.sin(j*63.7+k)*.75;
      const pit=addMesh(group,new T.CircleGeometry(.012+.02*rockNoise(j,2,k),9),pitMaterial,[x,normal.y*.697,normal.z*.697]);pit.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),normal);pit.castShadow=false;
    }
  }
  const tray=addMesh(scene,new T.BoxGeometry(7,.16,2.65),metal('#263440',.5),[0,-.84,0]);
  const rail=metal('#738b94');
  for(const z of [-1.2,1.2])bar(scene,[-3.4,-.68,z],[3.4,-.68,z],.025,rail);
  for(const x of [-2.1,2.1]){
    const support=new T.TorusGeometry(.75,.055,10,48,Math.PI);support.rotateZ(Math.PI);support.rotateY(Math.PI/2);addMesh(scene,support,rail,[x,.2,0]);
    addMesh(scene,new T.BoxGeometry(.17,.22,.52),metal('#293e48'),[x,-.62,0]);
  }
  for(let i=0;i<31;i++){addMesh(scene,new T.BoxGeometry(.015,.012,i%5===0?.17:.085),metal('#a6b2b2'),[-3+i*.2,-.747,1.03]);}
  for(const x of [-3.15,3.15])for(const z of [-1.05,1.05])addMesh(scene,new T.CylinderGeometry(.055,.055,.02,12),metal('#a7b4ba'),[x,-.74,z]);
  const scanner=new T.Group();scene.add(scanner);scanner.position.y=.2;
  const torus=new T.TorusGeometry(.97,.025,8,96);torus.rotateY(Math.PI/2);addMesh(scanner,torus,luminous('#80d4c5',1.4));
  const scanMaterial=new T.ShaderMaterial({transparent:true,side:T.DoubleSide,depthWrite:false,blending:T.AdditiveBlending,
    uniforms:{uTime:{value:0}},vertexShader:'varying vec2 vP;void main(){vP=position.xy;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:'uniform float uTime;varying vec2 vP;void main(){float d=length(vP);float lines=pow(max(0.,sin(d*42.-uTime*2.)),14.);gl_FragColor=vec4(.15,.76,.66,(.015+lines*.11)*(1.-smoothstep(.5,.92,d)));}'});
  const scan=addMesh(scanner,new T.CircleGeometry(.9,64),scanMaterial);scan.rotation.y=Math.PI/2;scan.castShadow=false;
  addMesh(scanner,new T.BoxGeometry(.16,.11,.28),metal('#638181'),[0,1.04,0]);
  const floor=addMesh(scene,new T.PlaneGeometry(70,70),new T.MeshStandardMaterial({color:'#10212c',roughness:.7,metalness:.18}),[0,-1.02,0]);floor.rotation.x=-Math.PI/2;
  let disposed=false,inView=false,raf=0,last=0,time=1.1,split=0,rendering=false;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function render(now:number){
    raf=0;if(disposed||!inView||document.hidden)return;rendering=true;
    const s=state(),dt=Math.min(.05,(now-last)/1000||0);last=now;const moving=s.motion&&!reduced.matches;if(moving)time+=dt;
    const target=s.mode==='split'?1:0;split=moving?T.MathUtils.damp(split,target,7,dt):target;if(Math.abs(split-target)<.001)split=target;
    groups.forEach((g,i)=>{g.position.x=centers[i]+(i-1)*split*.46;g.rotation.x=moving?Math.sin(time*.22)*.07:0;
      const material=shells[i].material as T.MeshStandardMaterial;material.transparent=s.mode==='pores';material.opacity=s.mode==='pores'?.16:1;material.depthWrite=s.mode!=='pores';pores[i].visible=s.mode==='pores';});
    scanner.visible=s.mode!=='split';scanner.position.x=Math.sin(time*.52)*2.75;scanMaterial.uniforms.uTime.value=time;
    uniforms.scan.value=scanner.position.x;uniforms.reveal.value=s.mode==='pores'?.3:0;
    controls.update();pipeline.render(time,s.theme,true);host.dataset.frame=String(Math.round(time*100));host.dataset.mode=s.mode;rendering=false;
    if(!raf&&(moving||split!==target))raf=requestAnimationFrame(render);
  }
  function wake(){if(!disposed&&inView&&!document.hidden&&!raf){last=performance.now();raf=requestAnimationFrame(render);}}
  const resize=()=>{const w=host.clientWidth,h=host.clientHeight;if(w&&h){pipeline.resize(w,h);camera.aspect=w/h;camera.fov=32+Math.max(0,1.6-w/h)*18;camera.updateProjectionMatrix();wake();}};
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);
  const observer=new IntersectionObserver(([e])=>{inView=e.isIntersecting;if(inView)wake();else{cancelAnimationFrame(raf);raf=0;}},{rootMargin:'60px'});observer.observe(host);
  const change=()=>{if(!rendering)wake();},visible=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else wake();};controls.addEventListener('change',change);document.addEventListener('visibilitychange',visible);reduced.addEventListener('change',wake);
  const keyboard=(e:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){camera.position.set(3.4,3.4,8.4);controls.target.set(0,-.1,0);}else{const v=camera.position.clone().sub(controls.target);v.applyAxisAngle(new T.Vector3(0,1,0),e.key==='ArrowLeft'?-.15:.15);camera.position.copy(controls.target).add(v);}controls.update();wake();};host.addEventListener('keydown',keyboard);resize();
  return {wake,dispose(){disposed=true;cancelAnimationFrame(raf);resizeObserver.disconnect();observer.disconnect();controls.removeEventListener('change',change);controls.dispose();document.removeEventListener('visibilitychange',visible);reduced.removeEventListener('change',wake);host.removeEventListener('keydown',keyboard);pipeline.dispose();disposeScene(scene);renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();}};
}
