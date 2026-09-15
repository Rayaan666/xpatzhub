import { motion, useReducedMotion } from 'framer-motion';
import './influence-impact.css';

const photos = [
  { id: 'seen', label: 'SEEN.', width: 544, alt: 'A hand arranges an amber fragrance bottle with a black cap on textured dark stone.' },
  { id: 'remembered', label: 'REMEMBERED.', width: 1088, alt: 'A creator seen from behind films the same fragrance in a stone-lined Dubai boutique, with the skyline beyond a large window.' },
  { id: 'acted', label: 'ACTED ON.', width: 544, alt: 'Hands hold a phone displaying the finished photograph of the campaign’s amber fragrance bottle.' },
];
const outcomes = [
  ['REACH', 'Put your brand in front of relevant creator audiences.'],
  ['ENGAGEMENT', 'Turn passive views into conversations, reactions and interaction.'],
  ['BRAND AWARENESS', 'Create repeated, memorable exposure through authentic creator storytelling.'],
  ['CONTENT VALUE', 'Generate creator-led assets that can continue working beyond a single post.'],
  ['AUDIENCE CONNECTION', 'Introduce brands through voices audiences already choose to follow.'],
  ['CAMPAIGN IMPACT', 'Connect creator activity with wider marketing and business objectives.'],
];

export default function InfluenceImpact() {
  const reduced = useReducedMotion();
  const reveal = (delay = 0) => ({
    initial: reduced ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: .15 },
    transition: { duration: .6, delay, ease: 'easeOut' },
  });

  return <section className="influence-impact relative overflow-hidden" aria-labelledby="influence-impact-title">
    <div className="influence-impact__inner mx-auto">
      <header className="influence-impact__intro grid">
        <motion.div {...reveal()}>
          <p className="influence-impact__eyebrow">BEYOND THE POST</p>
          <h2 id="influence-impact-title"><span>Attention Is Good.</span><span>Action Is Better.</span></h2>
        </motion.div>
        <motion.p {...reveal(.08)} className="influence-impact__lead">We look beyond likes and follower counts to understand how creator campaigns build visibility, spark engagement and create meaningful opportunities for brands.</motion.p>
        <motion.p {...reveal(.12)} className="influence-impact__handnote"><span>Real</span><span>Creators.</span><span>Real</span><span>Opportunities.</span></motion.p>
      </header>

      <div className="influence-impact__campaign relative">
        <div className="influence-impact__strip grid">
          {photos.map((photo, index) => <motion.figure {...reveal(index * .1)} key={photo.id} className={`influence-impact__photo influence-impact__photo--${photo.id}`}>
            <img src={`/assets/influencers/impact/${photo.id}-${photo.width}.webp`} srcSet={`/assets/influencers/impact/${photo.id}-${photo.width / 2}.webp ${photo.width / 2}w, /assets/influencers/impact/${photo.id}-${photo.width}.webp ${photo.width}w`} sizes={index === 1 ? '(max-width: 640px) 92vw, 51vw' : '(max-width: 640px) 45vw, 25vw'} width={photo.width} height="725" loading="lazy" decoding="async" alt={photo.alt} />
            <figcaption>{photo.label}</figcaption>
          </motion.figure>)}
        </div>
        <svg className="influence-impact__curve" viewBox="0 0 1672 160" preserveAspectRatio="none" aria-hidden="true"><motion.path d="M-20 100 C280 161 790 106 1060 102 S1440 6 1692 33" fill="none" initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.3, delay: .2 }} /></svg>
        <motion.p {...reveal(.2)} className="influence-impact__display" aria-hidden="true">IMPACT.</motion.p>
        <p className="influence-impact__editorial"><span>CREATORS</span><span>CULTURE</span><span>COMMERCE</span><span>A BRIGHTER TOMORROW</span></p>
      </div>

      <ol className="influence-impact__outcomes grid">
        {outcomes.map(([title, description], index) => <motion.li {...reveal((index % 3) * .06)} key={title}>
          <h3><span>0{index + 1} /</span> {title}</h3>
          <p>{description}</p>
        </motion.li>)}
      </ol>

      <div className="influence-impact__closing flex">
        <p className="influence-impact__statement"><span>FROM SCROLL →</span> <span>TO CONNECTION →</span> <span>TO ACTION.</span></p>
        <p className="influence-impact__closing-note"><span>Influence means more</span><span>when something happens next.</span></p>
      </div>
    </div>
  </section>;
}
