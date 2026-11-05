/** Teaching coordinates, not geographic positions or a construction sequence. */
export const chapters = [
  {id:'discover',name:'发现地下',subtitle:'从地表证据到地下解释',indices:[0,1],color:'#ef7840'},
  {id:'develop',name:'建井与开发',subtitle:'连接储层与地表',indices:[2,3,4,5,6,7,8],color:'#119d85'},
  {id:'extend',name:'维护、增采与地面工程',subtitle:'让资源持续、高效地流动',indices:[9,10,11,12],color:'#a383dc'}
];
export const stations = [
  {position:[-6,1.5,-1.5],color:'#ee7942',concept:'地表线索',detail:'从露头、遥感和化探样点寻找线索，再用地下资料交叉验证。地表特征不能唯一确定地下储层。'},
  {position:[-4.2,.9,-2.6],color:'#e5b13d',concept:'地震观测',detail:'震源激发弹性波，检波器记录传播与反射信号，用于解释地下界面与构造，并非直接拍摄地下。'},
  {position:[-2.1,2.3,3.82],color:'#f18b41',concept:'钻达目标',detail:'钻头穿过不同岩层，井眼把地表与目标层连接。轨迹与参数需要结合地质、工程和井下观测调整。'},
  {position:[-.25,1.0,.8],color:'#39b79a',concept:'钻进中的证据',detail:'岩屑、气测与钻时提供随钻返回的地层线索；录井与测井的数据来源和观测方式不同。'},
  {position:[-2.1,-.65,3.85],color:'#4fc8b2',concept:'沿井观测',detail:'测量工具沿井筒记录岩层物理响应，再结合岩心等资料解释岩性、层界与储层参数。'},
  {position:[-2.1,-1.35,3.85],color:'#9acc77',concept:'环空封隔',detail:'水泥浆置于套管与地层之间的环空，形成支撑与层间封隔；示意中的环带不是储层本身。'},
  {position:[-.6,-1.85,3.85],color:'#d5b75d',concept:'建立生产通道',detail:'完井按井况配置管柱与井下工具，为后续生产建立受控通道；具体方式取决于储层与工程条件。'},
  {position:[1.4,-1.8,3.85],color:'#ef8561',concept:'沟通近井储层',detail:'套管井射孔穿过套管、水泥环及近井地层形成孔道，沟通井筒与储层。不是把整层岩石炸开。'},
  {position:[2.2,1.15,1.25],color:'#19ae86',concept:'流体举升',detail:'储层流体经井筒到达地表。抽油机示意有杆泵举升的一种方式，不代表所有油井都需要抽油机。'},
  {position:[3.0,1.8,-1.7],color:'#dc9576',concept:'恢复井的能力',detail:'修井针对井筒、管柱或设备问题进行维护和处理，依据井史与诊断决定方案。'},
  {position:[3.6,-1.5,3.8],color:'#bf8fdf',concept:'改善驱替与动用',detail:'增采涉及注入、压裂及其他改善开发效果的措施；图中的注入线仅用于解释井与储层的联系。'},
  {position:[5.4,.9,1.3],color:'#d3a54e',concept:'管道与集输',detail:'井口产物经集输和处理后进入输送系统，压力、流量与完整性监测共同支撑运行。'},
  {position:[6.0,1.7,-2.1],color:'#b091ce',concept:'分离与转化',detail:'炼化装置对原料进行分离、转化与质量控制。塔器只是流程中的一类设备，不能等同完整炼厂。'}
] as const;
export const rockLayers=[
  {id:'cover',name:'上覆岩层',color:'#8d8670'},
  {id:'seal',name:'盖层',color:'#5f685e'},
  {id:'reservoir',name:'储层',color:'#ae8554'},
  {id:'source',name:'烃源岩',color:'#756653'},
  {id:'base',name:'深部岩层',color:'#595854'}
];
