const KEY='atlas.admin.v1',SESSION='atlas.admin.session';
function hash(text:string){let h=5381;for(let i=0;i<text.length;i++)h=((h<<5)+h+text.charCodeAt(i))>>>0;return h.toString(36)}
function account(){try{const saved=JSON.parse(localStorage.getItem(KEY)||'null');if(saved?.user&&saved?.hash)return saved}catch{}const value={user:'admin',hash:hash('admin123')};localStorage.setItem(KEY,JSON.stringify(value));return value}
export function loggedIn(){return sessionStorage.getItem(SESSION)==='1'}
export function signIn(user:string,password:string){const value=account();if(value.user!==user.trim()||value.hash!==hash(password))throw Error('账号或密码不正确');sessionStorage.setItem(SESSION,'1')}
export function signOut(){sessionStorage.removeItem(SESSION)}
export function changePassword(current:string,next:string){const value=account();if(value.hash!==hash(current))throw Error('当前密码不正确');if(next.length<6)throw Error('新密码至少 6 个字符');localStorage.setItem(KEY,JSON.stringify({...value,hash:hash(next)}))}
