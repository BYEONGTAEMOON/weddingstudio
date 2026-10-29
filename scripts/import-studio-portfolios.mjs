// Deterministic web asset preparation: SVG viewports retain the original photo composition.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
const inputRoot = process.argv[2];
const refine = process.argv.includes('--refine');
if (!inputRoot) throw new Error('Pass the directory containing manifest.json');
const studios = JSON.parse(fs.readFileSync(path.join(inputRoot, 'manifest.json')));
const descriptions = {
 'go-studio': ['정원과 클래식 공간, 바다와 노을 스냅까지 다채로운 배경에서 두 사람의 순간을 담는 웨딩스튜디오', ['가든','클래식','바다스냅'], 4],
 nowood: ['차분한 실내 공간과 부드러운 자연광, 감각적인 인물 사진과 야간 촬영을 담는 웨딩스튜디오', ['자연광','인물중심','무드화보'], 14],
 'venessa-lumenhaus': ['싱그러운 정원과 따뜻한 실내 세트, 한옥과 도심 스냅으로 다채로운 감성을 담는 웨딩스튜디오', ['가든','한옥','감성스냅'], 30],
 luvjoy: ['따뜻한 실내 공간과 편안한 일상 같은 연출, 도심과 바다 스냅으로 자연스러운 표정을 담는 웨딩스튜디오', ['내추럴','실내스냅','바다스냅'], 15],
 luvhaus: ['초록빛 정원과 한옥 공간, 밝은 자연광 세트와 야간 조명으로 로맨틱한 순간을 담는 웨딩스튜디오', ['한옥','가든','야간촬영'], 25],
 noi: ['부드러운 실내 자연광과 감성적인 인물 화보, 숲과 해변 촬영으로 다양한 순간을 담는 웨딩스튜디오', ['자연광','숲속','해변스냅'], 29],
 'love-each-other': ['따뜻한 창가 자연광과 편안한 실내 공간, 도심과 야간 스냅으로 두 사람의 감정을 담는 웨딩스튜디오', ['자연광','내추럴','야간스냅'], 7],
 'monet-haeundae': ['차분한 인물 화보와 초록빛 정원, 부드러운 빛으로 두 사람의 분위기를 담는 웨딩스튜디오', ['인물중심','가든','클래식'], 4],
 bellybygo: ['햇살 가득한 하우스와 숲속 정원, 한옥과 노을 촬영으로 자연스러운 순간을 담는 웨딩스튜디오', ['하우스','숲속','한옥'], 12],
 modernmind: ['싱그러운 정원과 밝은 실내 공간, 해변과 야간 가든 촬영으로 로맨틱한 순간을 담는 웨딩스튜디오', ['가든','해변스냅','자연광'], 38],
 odette: ['감각적인 조명과 플라워 연출, 클래식 세트와 한복 화보까지 다채로운 스타일을 담는 웨딩스튜디오', ['플라워','클래식','한복화보'], 19],
 onne: ['부드러운 창가 빛과 차분한 실내 공간, 정원과 노을 스냅으로 로맨틱한 순간을 담는 웨딩스튜디오', ['자연광','인물중심','가든'], 14],

 voirhaus: ['밝은 화이트 공간과 부드러운 창가 자연광, 감각적인 인물 화보로 두 사람의 순간을 담는 웨딩스튜디오', ['화이트톤','자연광','인물중심'], 8],
 bemy: ['햇살 가득한 하우스와 초록빛 가든, 따뜻한 실내 세트와 노을 촬영으로 로맨틱한 순간을 담는 웨딩스튜디오', ['하우스','가든','로맨틱'], 16],
 'baro-oneul': ['밝은 창가 자연광과 싱그러운 정원, 편안한 인물 화보와 도심 스냅을 담는 웨딩스튜디오', ['자연광','가든','내추럴'], 24],
 needs: ['자연광 실내 세트와 초록빛 정원, 도심과 야간 스냅까지 다양한 분위기의 웨딩 사진을 담는 스튜디오', ['자연광','가든','야간스냅'], 2],
 benoit: ['따뜻한 우드 공간과 창가 자연광, 클래식 세트와 야외 스냅으로 로맨틱한 순간을 담는 웨딩스튜디오', ['자연광','클래식','로맨틱'], 15],
 vivienda: ['절제된 건축 공간과 빛의 대비, 정원 촬영으로 차분하고 세련된 분위기를 담는 웨딩스튜디오', ['건축공간','자연광','모던'], 19],
 semiang: ['초록빛 정원과 커다란 창가, 부드러운 자연광과 흑백 화보로 두 사람의 순간을 담는 웨딩스튜디오', ['가든','자연광','흑백화보'], 5],
 sonar: ['자연광 실내와 싱그러운 가든, 감각적인 인물 사진과 야간 스냅을 담는 웨딩스튜디오', ['자연광','인물중심','가든'], 39],
 arsen: ['편안한 하우스 공간과 일상 같은 소품, 도심과 노을 스냅으로 생생한 표정을 담는 웨딩스튜디오', ['하우스','내추럴','도심스냅'], 40],
 aura: ['플라워 공간과 클래식 실내 세트, 자연광과 야경으로 다채로운 웨딩 화보를 담는 스튜디오', ['플라워','클래식','야경'], 3],
 elai: ['밝은 자연광과 초록빛 정원, 다양한 실내 공간과 야외 스냅으로 자연스러운 순간을 담는 웨딩스튜디오', ['자연광','가든','감성스냅'], 59],
 pia: ['절제된 인물 화보와 부드러운 자연광, 정원 촬영으로 두 사람의 표정을 담는 웨딩스튜디오', ['인물중심','자연광','흑백화보'], 2],
 hazely: ['넓은 잔디 정원과 햇살 가득한 하우스, 도심 야경까지 따뜻하고 자연스러운 순간을 담는 웨딩스튜디오', ['잔디정원','하우스','야간스냅'], 1],
};
function runs(values) {
 const out=[];let start=-1;
 for(let i=0;i<=values.length;i++) {if(values[i]&&start<0)start=i;if(!values[i]&&start>=0){out.push([start,i]);start=-1;}}
 // Close tiny compression gaps inside photo areas.
 for(let i=out.length-1;i>0;i--)if(out[i][0]-out[i-1][1]<=4){out[i-1][1]=out[i][1];out.splice(i,1);}
 return out;
}
function regions(data,w,h,box,depth=0) {
 const [x,y,r,b]=box;const cw=r-x,ch=b-y;
 const cols=Array(cw).fill(0),rows=Array(ch).fill(0);
 for(let yy=y;yy<b;yy++)for(let xx=x;xx<r;xx++){const k=(yy*w+xx)*3;if(Math.min(data[k],data[k+1],data[k+2])<245){cols[xx-x]++;rows[yy-y]++;}}
 const xs=runs(cols.map(n=>n/ch>.08)).filter(([a,b])=>b-a>24);
 const ys=runs(rows.map(n=>n/cw>.08)).filter(([a,b])=>b-a>24);
 if(!xs.length||!ys.length)return [];
 // Recursively isolate photos separated by white album gutters.
 if(depth<4&&xs.length>1)return xs.flatMap(([a,b])=>regions(data,w,h,[x+a,y,x+b,box[3]],depth+1));
 if(depth<4&&ys.length>1)return ys.flatMap(([a,b])=>regions(data,w,h,[x,y+a,box[2],y+b],depth+1));
 const result=[x+xs[0][0],y+ys[0][0],x+xs.at(-1)[1],y+ys.at(-1)[1]];
 return (result[2]-result[0])*(result[3]-result[1])>w*h*.025?[result]:[];
}
(async()=>{
 const result=[],audit=[];
 const previousAudit=refine?JSON.parse(fs.readFileSync('scripts/studio-import-manifest.json')):[];
 for(const studio of studios){
  const out=path.join('public/studios',studio.slug);if(fs.existsSync(out)&&!refine)throw Error('Directory already exists: '+out);fs.mkdirSync(out,{recursive:true});
  const samples=[];let main;const [description,tags,cover]=descriptions[studio.slug];
  for(let index=0;index<studio.files.length;index++){
   if(studio.skipPages?.includes(index+1))continue;
   const f=studio.files[index];
   const probe=await sharp(f.path).rotate().resize({width:900,height:900,fit:'inside',withoutEnlargement:true}).removeAlpha().raw().toBuffer({resolveWithObject:true});
   const {width:w,height:h}=probe.info;
   const album=studio.album===true||studio.albumPages?.includes(index+1)||['needs','benoit','voirhaus'].includes(studio.slug);
   let boxes=regions(probe.data,w,h,[0,0,w,h]);
   if(album)boxes=boxes.flatMap(b=>!studio.preserveFullSpread&&b[2]-b[0]>.96*w&&b[3]-b[1]>.96*h?[[b[0],b[1],Math.floor(w/2),b[3]],[Math.floor(w/2),b[1],b[2],b[3]]]:[b]).filter(b=>(b[2]-b[0])/(b[3]-b[1])>.2&&(b[3]-b[1])>h*.18);
   // Full-bleed photography retains the complete frame; trim only clearly white outer margins.
   if(!album){
    const whiteRow=yy=>{let n=0;for(let x=0;x<w;x++){let k=(yy*w+x)*3;if(Math.min(...probe.data.subarray(k,k+3))>247)n++;}return n/w>.985;};
    const whiteCol=xx=>{let n=0;for(let y=0;y<h;y++){let k=(y*w+xx)*3;if(Math.min(...probe.data.subarray(k,k+3))>247)n++;}return n/h>.985;};
    let t=0,b=h,l=0,r=w;while(t<b-1&&whiteRow(t))t++;while(b>t+1&&whiteRow(b-1))b--;while(l<r-1&&whiteCol(l))l++;while(r>l+1&&whiteCol(r-1))r--;
    boxes=[[l,t,r,b]];
    const marginPages={bemy:[18,62],semiang:[5,11,13,23,24,25,36,55,62,63,64,65,68,78],pia:[79],aura:[37],elai:[84,90,91,95,125,132,135,137,138,146,147,151,154,164,165]};
    if(marginPages[studio.slug]?.includes(index+1)){const detected=regions(probe.data,w,h,[0,0,w,h]);if(detected.length)boxes=[detected.sort((a,b)=>(b[2]-b[0])*(b[3]-b[1])-(a[2]-a[0])*(a[3]-a[1]))[0]];}
    const grids={noi:{22:[1,2],23:[2,2]},bellybygo:{2:[2,2]},bemy:{50:[2,3],57:[1,3],62:[1,2]},'baro-oneul':{34:[1,3],42:[4,1]},aura:{32:[2,2],46:[2,2]},arsen:{35:[1,3]},elai:{178:[1,2],179:[1,2],180:[1,2],184:[2,2],187:[2,2],188:[2,2],189:[3,1]}};
    const grid=grids[studio.slug]?.[index+1];
    if((studio.slug==='pia'&&index+1===22)||(studio.slug==='bemy'&&index+1===18))boxes=regions(probe.data,w,h,[0,0,w,h]);
    if(grid){boxes=[];for(let gy=0;gy<grid[1];gy++)for(let gx=0;gx<grid[0];gx++){const cell=[Math.round(gx*w/grid[0]),Math.round(gy*h/grid[1]),Math.round((gx+1)*w/grid[0]),Math.round((gy+1)*h/grid[1])];const detected=regions(probe.data,w,h,cell);boxes.push(detected.sort((a,b)=>(b[2]-b[0])*(b[3]-b[1])-(a[2]-a[0])*(a[3]-a[1]))[0]||cell);}}
   }
   if(studio.slug==='needs'&&[4,18].includes(index+1)){const side=index+1===4?0:1;const sorted=boxes.sort((a,b)=>a[0]-b[0]);const target=sorted[side];if(target){const [l,t,r,b]=target,mx=Math.round((l+r)/2),my=Math.round((t+b)/2);boxes=sorted.flatMap(v=>v===target?[[l,t,mx,my],[mx,t,r,my],[l,my,mx,b],[mx,my,r,b]]:[v]);}}
   const panelSplits={voirhaus:{5:[0,'y',3],19:[0,'x',2],20:[1,'y',2],27:[0,'y',3],32:[1,'x',2],44:[0,'y',2]},'baro-oneul':{35:[0,'y',3]}};
   const panel=panelSplits[studio.slug]?.[index+1];
   if(panel){boxes.sort((a,b)=>a[0]-b[0]||a[1]-b[1]);const target=boxes[panel[0]];if(target){const [l,t,r,b]=target;boxes=boxes.flatMap(v=>v===target?Array.from({length:panel[2]},(_,j)=>panel[1]==='x'?[Math.round(l+(r-l)*j/panel[2]),t,Math.round(l+(r-l)*(j+1)/panel[2]),b]:[l,Math.round(t+(b-t)*j/panel[2]),r,Math.round(t+(b-t)*(j+1)/panel[2])]):[v]);}}
   if(studio.slug==='voirhaus'&&index+1===4)boxes=[[0,0,Math.round(w*7/18),h],[Math.round(w*11/18),0,w,h]];
   const exactPanels={nowood:{36:{canvas:[1200,700],boxes:[[0,0,466,700],[771,158,1029,544]]}},noi:{26:{canvas:[600,900],boxes:[[40,86,203,249],[219,86,382,249],[397,86,560,249],[40,287,203,451],[219,287,382,451],[397,287,560,451],[40,489,203,653],[219,489,382,653],[397,489,560,653]]}},'baro-oneul':{35:{canvas:[1200,700],boxes:[[115,4,485,232],[115,236,485,465],[115,469,485,696],[715,85,1084,615]]}},bemy:{50:{canvas:[720,900],boxes:[[154,62,359,317],[362,62,566,317],[154,323,359,577],[362,323,566,577],[154,583,359,838],[362,583,566,838]]},57:{canvas:[720,900],boxes:[[169,59,554,315],[169,323,554,579],[169,585,554,841]]}}};
   const exact=exactPanels[studio.slug]?.[index+1];
   if(exact)boxes=exact.boxes.map(b=>b.map((v,i)=>Math.round(v*(i%2?h/exact.canvas[1]:w/exact.canvas[0]))));
   let optimized;
   if(refine){const prior=previousAudit.find(a=>a.studio===studio.slug&&a.source===f.source);if(prior){const existing=fs.readFileSync(path.join(out,prior.file));optimized=prior.file.endsWith('.svg')?Buffer.from(existing.toString().match(/base64,([^"]+)/)[1],'base64'):existing;}}
   optimized=optimized||await sharp(f.path).rotate().resize({width:1920,height:2880,fit:'inside',withoutEnlargement:true}).jpeg({quality:87,mozjpeg:true}).toBuffer();
   const meta=await sharp(optimized).metadata();
   for(const box of boxes){
    const n=String(samples.length+1).padStart(2,'0');const prefix=refine?'photo':'sample';const full=box[0]===0&&box[1]===0&&box[2]===w&&box[3]===h;
    let filename;
    if(full){filename=`${prefix}-${n}.jpg`;fs.writeFileSync(path.join(out,filename),optimized);}
    else {filename=`${prefix}-${n}.svg`;let [l,t,r,b]=box;const x=Math.round(l/w*meta.width),y=Math.round(t/h*meta.height),ww=Math.round((r-l)/w*meta.width),hh=Math.round((b-t)/h*meta.height);fs.writeFileSync(path.join(out,filename),`<svg xmlns="http://www.w3.org/2000/svg" width="${ww}" height="${hh}" viewBox="${x} ${y} ${ww} ${hh}"><image width="${meta.width}" height="${meta.height}" href="data:image/jpeg;base64,${optimized.toString('base64')}"/></svg>`);}
    const url=`/studios/${studio.slug}/${filename}`;samples.push(url);if(index+1===cover&&!main)main=url;
    audit.push({studio:studio.slug,source:f.source,file:filename,viewport:box,canvas:[w,h]});
   }
  }
  if(!samples.length)throw Error('No samples '+studio.slug);
  result.push({slug:studio.slug,name:studio.name,description,tags,popular:true,image:main||samples[0],samples});
  console.log(studio.name,studio.files.length,'sources =>',samples.length,'samples');
 }
 const changed=new Set(result.map(s=>s.slug));
 const existingStudios=fs.existsSync('lib/imported-studios.json')?JSON.parse(fs.readFileSync('lib/imported-studios.json')):[];
 fs.writeFileSync('lib/imported-studios.json',JSON.stringify([...existingStudios.filter(s=>!changed.has(s.slug)),...result],null,2)+'\n');
 const existingAudit=fs.existsSync('scripts/studio-import-manifest.json')?JSON.parse(fs.readFileSync('scripts/studio-import-manifest.json')):[];
 fs.writeFileSync('scripts/studio-import-manifest.json',JSON.stringify([...existingAudit.filter(s=>!changed.has(s.studio)),...audit],null,2)+'\n');
})();
