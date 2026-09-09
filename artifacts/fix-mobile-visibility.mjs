import fs from 'node:fs';
const p='src/MobileHero.jsx';let s=fs.readFileSync(p,'utf8');
const a=s.indexOf('      <svg className="pm-artwork"');const b=s.indexOf('      <p className="pm-annotation',a);
s=s.slice(0,a)+`      <div className="pm-artwork" aria-label="Five phones showcasing events, PR, brands, digital marketing and community">
        {phones.map((p,index)=><motion.div key={p.id} className={\`pm-phone pm-phone-\${p.id}\`} initial={reduced?false:{opacity:.85,x:p.x,y:p.y}} animate={{opacity:1,x:0,y:0}} transition={{duration:.9,delay:index*.07,ease}}>
          <svg viewBox="0 0 941 1672" role="img" aria-label={p.label}>
            <defs>
              <clipPath id={\`portrait-\${p.id}\`} clipPathUnits="userSpaceOnUse"><path d={p.path}/></clipPath>
              {p.id==='central'&&<mask id="portrait-copy-clear" maskUnits="userSpaceOnUse" x="0" y="0" width="941" height="1672"><rect width="941" height="1672" fill="white"/><rect x="0" y="840" width="512" height="272" fill="black"/></mask>}
            </defs>
            <g mask={p.id==='central'?'url(#portrait-copy-clear)':undefined}><image href="/assets/mobile-approved.png" width="941" height="1672" clipPath={\`url(#portrait-\${p.id})\`}/></g>
          </svg>
        </motion.div>)}
        <svg className="pm-script-artwork" viewBox="0 0 941 1672" aria-hidden="true">
          <defs><clipPath id="portrait-annotation" clipPathUnits="userSpaceOnUse"><path d="M532 1235 H696 L716 1440 L686 1465 H532 Z"/></clipPath></defs>
          <image href="/assets/mobile-approved.png" width="941" height="1672" clipPath="url(#portrait-annotation)"/>
        </svg>
      </div>
`+s.slice(b);
fs.writeFileSync(p,s);
fs.appendFileSync('src/mobile-hero.css',`\n/* Animate HTML layers: SVG groups are not reliable intersection targets in iOS webviews. */\n@media(max-width:767px){\n.pm-phone,.pm-script-artwork{position:absolute;inset:0;width:100%;height:100%}\n.pm-phone>svg{display:block;width:100%;height:100%;overflow:visible}\n}\n`);
