const axios = require('axios');
const xml2js = require('xml2js');

const ARXIV_CATEGORIES = {
  space:   'cat:astro-ph OR cat:gr-qc',
  bio:     'cat:q-bio OR cat:cond-mat.soft',
  ai:      'cat:cs.AI OR cat:cs.LG',
  physics: 'cat:physics OR cat:quant-ph',
  chem:    'cat:cond-mat OR cat:physics.chem-ph',
};

const FALLBACK = {
  ai: [
    { id:'1', title:'Attention Is All You Need', summary:'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks. We propose the Transformer, based solely on attention mechanisms, which outperforms all previous models on translation tasks.', authors:'Vaswani et al.', published:'2024-01-01', category:'ai' },
    { id:'2', title:'Large Language Models are Few-Shot Learners', summary:'We demonstrate that scaling up language models greatly improves task-agnostic few-shot performance, sometimes reaching competitiveness with fine-tuning approaches on many NLP benchmarks.', authors:'Brown et al.', published:'2024-01-02', category:'ai' },
    { id:'3', title:'Deep Reinforcement Learning from Human Feedback', summary:'We fine-tune language models to follow instructions using reinforcement learning from human feedback, resulting in models that are more helpful, honest, and harmless than the original.', authors:'Ouyang et al.', published:'2024-01-03', category:'ai' },
    { id:'4', title:'Neural Scaling Laws for Language Models', summary:'We study empirical scaling laws for language model performance, finding that loss scales as a power-law with model size, dataset size, and compute budget used for training.', authors:'Kaplan et al.', published:'2024-01-04', category:'ai' },
  ],
  space: [
    { id:'5', title:'Gravitational Waves from Binary Black Hole Merger', summary:'We report the observation of gravitational waves from the merger of two black holes, confirming a major prediction of general relativity and opening an entirely new observational window on the cosmos.', authors:'Abbott et al.', published:'2024-01-01', category:'space' },
    { id:'6', title:'First Image of a Black Hole Shadow', summary:'We present the first image of a supermassive black hole and its shadow, revealing the characteristic bright ring and dark central region predicted by general relativity decades ago.', authors:'EHT Collaboration', published:'2024-01-02', category:'space' },
    { id:'7', title:'JWST First Deep Field of the Early Universe', summary:'James Webb Space Telescope presents the deepest infrared image of the universe ever taken, showing thousands of galaxies including some formed just 300 million years after the Big Bang.', authors:'Gardner et al.', published:'2024-01-03', category:'space' },
  ],
  bio: [
    { id:'8', title:'CRISPR-Cas9 Enables Precise Genome Editing in Human Cells', summary:'We demonstrate precise and efficient genome editing in human cells using the CRISPR-Cas9 system, enabling targeted modifications to the genome with unprecedented accuracy and efficiency.', authors:'Cong et al.', published:'2024-01-01', category:'bio' },
    { id:'9', title:'AlphaFold Predicts Protein Structure at Atomic Accuracy', summary:'We present AlphaFold, a deep learning system that predicts protein 3D structures from amino acid sequences with atomic-level accuracy, solving a 50-year grand challenge in biology.', authors:'Jumper et al.', published:'2024-01-02', category:'bio' },
    { id:'10', title:'mRNA Vaccines Provide Strong Immunity Against COVID-19', summary:'We demonstrate that mRNA-based vaccines produce robust protective immunity against SARS-CoV-2 with 95% efficacy and a favorable safety profile across diverse global populations.', authors:'Polack et al.', published:'2024-01-03', category:'bio' },
  ],
  physics: [
    { id:'11', title:'Near-Room-Temperature Superconductivity in Hydrogen Compounds', summary:'We report experimental evidence for superconductivity at 288 Kelvin in a carbonaceous sulfur hydride under high pressure, the highest critical temperature ever recorded for any superconductor.', authors:'Snider et al.', published:'2024-01-01', category:'physics' },
    { id:'12', title:'Satellite-Based Quantum Entanglement Over 1200km', summary:'We demonstrate quantum entanglement distribution over 1200 km via the Micius satellite, establishing a foundation for a global quantum communication network with unconditional security guarantees.', authors:'Yin et al.', published:'2024-01-02', category:'physics' },
    { id:'13', title:'Observation of the Higgs Boson at the LHC', summary:'We report the observation of a new boson with mass approximately 125 GeV consistent with the long-predicted Higgs boson, completing the Standard Model of particle physics after 50 years.', authors:'ATLAS & CMS', published:'2024-01-03', category:'physics' },
  ],
  chem: [
    { id:'14', title:'Artificial Photosynthesis Achieves Record 22% Solar Efficiency', summary:'We report an artificial photosynthesis device converting sunlight and CO2 into usable fuel with record 22% solar-to-fuel efficiency, a key milestone for renewable carbon-neutral energy production.', authors:'Liu et al.', published:'2024-01-01', category:'chem' },
    { id:'15', title:'Self-Healing Polymers Repair Damage at Room Temperature', summary:'We present a new class of dynamic covalent polymers that spontaneously repair mechanical damage at room temperature without any external stimulus, enabling applications in flexible electronics.', authors:'White et al.', published:'2024-01-02', category:'chem' },
    { id:'16', title:'MOF Catalyst Captures CO2 from Air at 95% Efficiency', summary:'We develop a metal-organic framework sorbent capturing carbon dioxide directly from ambient air at 95% efficiency and low cost, enabling scalable direct air carbon capture technology.', authors:'Yaghi et al.', published:'2024-01-03', category:'chem' },
  ],
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const category = req.query.category || 'ai';
  const query = ARXIV_CATEGORIES[category] || ARXIV_CATEGORIES.ai;
  try {
    const url = `https://export.arxiv.org/api/query?search_query=${encodeURIComponent(query)}&sortBy=submittedDate&sortOrder=descending&max_results=6`;
    const { data } = await axios.get(url, { timeout: 7000 });
    const parsed = await xml2js.parseStringPromise(data, { explicitArray: false });
    const entries = parsed.feed.entry;
    if (!entries) throw new Error('no entries');
    const list = (Array.isArray(entries) ? entries : [entries]).map(e => ({
      id: e.id,
      title: e.title?.replace(/\s+/g,' ').trim(),
      summary: e.summary?.replace(/\s+/g,' ').trim(),
      authors: Array.isArray(e.author) ? e.author.map(a=>a.name).join(', ') : e.author?.name||'Unknown',
      published: e.published?.slice(0,10),
      category,
    }));
    res.json(list);
  } catch(err) {
    console.error('ArXiv failed, using fallback:', err.message);
    res.json(FALLBACK[category] || FALLBACK.ai);
  }
};
