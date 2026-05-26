const WORD_BANK = {

  "🐾 Animals": [
    "elephant", "penguin", "dolphin", "chameleon", "cobra",
    "panda", "cheetah", "octopus", "flamingo", "gorilla",
    "jaguar", "koala", "narwhal", "capybara", "axolotl",
    "platypus", "meerkat", "wolverine", "tapir", "okapi",
    "manatee", "pangolin", "armadillo", "cassowary", "wombat",
    "hyena", "lynx", "caracal", "serval", "ocelot",
    "albatross", "condor", "pelican", "toucan", "macaw",
    "piranha", "barracuda", "manta ray", "hammerhead", "stingray",
    "komodo dragon", "iguana", "gecko", "salamander", "axolotl",
    "bison", "wildebeest", "caribou", "moose", "ibex"
  ],

  "🍕 Food & Drinks": [
    "sushi", "burrito", "tiramisu", "croissant", "ramen",
    "fondue", "paella", "dim sum", "gelato", "baklava",
    "gyoza", "hummus", "boba", "pho", "ceviche",
    "risotto", "tagine", "biryani", "goulash", "pierogi",
    "kimchi", "tempura", "satay", "falafel", "shakshuka",
    "chimichanga", "empanada", "arepa", "injera", "borscht",
    "moussaka", "spanakopita", "ratatouille", "bouillabaisse", "cassoulet",
    "poutine", "shawarma", "kebab", "yakitori", "bulgogi",
    "laksa", "rendang", "nasi goreng", "pad thai", "massaman",
    "espresso", "matcha", "horchata", "lassi", "kombucha"
  ],

  "⚽ Sports": [
    "surfing", "fencing", "archery", "curling", "lacrosse",
    "handball", "squash", "biathlon", "javelin", "discus",
    "bobsled", "wrestling", "skeleton", "polo", "rowing",
    "weightlifting", "judo", "taekwondo", "karate", "aikido",
    "triathlon", "pentathlon", "decathlon", "heptathlon", "steeplechase",
    "moguls", "slalom", "halfpipe", "luge", "skeleton",
    "synchronized swimming", "water polo", "canoe", "kayak", "sailing",
    "rock climbing", "parkour", "skateboarding", "BMX", "motocross",
    "dressage", "equestrian", "snooker", "darts", "bowls",
    "badminton", "table tennis", "racquetball", "croquet", "kabaddi"
  ],

  "🎬 Movies & TV": [
    "inception", "matrix", "avatar", "parasite", "joker",
    "dunkirk", "arrival", "interstellar", "gravity", "dune",
    "oppenheimer", "barbie", "titanic", "gladiator", "frozen",
    "whiplash", "moonlight", "nomadland", "spotlight", "parasite",
    "hereditary", "midsommar", "annihilation", "ex machina", "tenet",
    "prestige", "memento", "mulholland", "vertigo", "psycho",
    "casablanca", "chinatown", "goodfellas", "fargo", "pulp fiction",
    "shining", "alien", "blade runner", "metropolis", "brazil",
    "breaking bad", "sopranos", "wire", "succession", "chernobyl",
    "westworld", "dark", "severance", "euphoria", "squid game"
  ],

  "💻 Technology": [
    "blockchain", "algorithm", "satellite", "transistor", "compiler",
    "bandwidth", "firmware", "kernel", "router", "server",
    "socket", "token", "protocol", "interface", "pixel",
    "encryption", "database", "variable", "recursion", "bandwidth",
    "hypervisor", "container", "microservice", "webhook", "endpoint",
    "latency", "throughput", "checksum", "payload", "handshake",
    "sandbox", "runtime", "debugger", "refactor", "deployment",
    "authentication", "authorization", "middleware", "pipeline", "cache",
    "repository", "branch", "commit", "merge", "rollback",
    "neural network", "gradient", "tensor", "cluster", "node"
  ],

  "🌿 Nature": [
    "glacier", "volcano", "monsoon", "aurora", "canyon",
    "stalactite", "geyser", "fjord", "tundra", "mangrove",
    "lagoon", "plateau", "savanna", "delta", "archipelago",
    "atoll", "mesa", "butte", "caldera", "escarpment",
    "permafrost", "moraine", "watershed", "tributary", "estuary",
    "bog", "fen", "mire", "taiga", "chaparral",
    "steppe", "pampas", "veldt", "karst", "sinkhole",
    "spring", "gully", "ravine", "gorge", "bluff",
    "coral", "kelp", "plankton", "spore", "mycelium",
    "bioluminescence", "thermocline", "solstice", "equinox", "monsoon"
  ],

  "💼 Occupations": [
    "surgeon", "architect", "astronaut", "sommelier", "cartographer",
    "archaeologist", "taxidermist", "actuary", "mortician", "curator",
    "locksmith", "blacksmith", "archivist", "mediator", "conductor",
    "stenographer", "podiatrist", "orthodontist", "radiologist", "anesthesiologist",
    "metallurgist", "geologist", "seismologist", "volcanologist", "oceanographer",
    "cryptographer", "etymologist", "numismatist", "philatelist", "ornithologist",
    "entomologist", "mycologist", "herpetologist", "ichthyologist", "malacologist",
    "glazier", "cooper", "fletcher", "chandler", "millwright",
    "farrier", "saddler", "tanner", "cobbler", "hatter",
    "docent", "notary", "bailiff", "surveyor", "appraiser"
  ],

  "✈️ Travel": [
    "passport", "hostel", "layover", "customs", "concierge",
    "itinerary", "excursion", "boarding", "carousel", "terminal",
    "departure", "charter", "transit", "souvenir", "jetlag",
    "backpacking", "pilgrimage", "expedition", "safari", "cruise",
    "immigration", "quarantine", "embargo", "contraband", "declaration",
    "boutique hotel", "villa", "bungalow", "campsite", "glamping",
    "overland", "hitchhike", "interrail", "stopover", "connection",
    "landmark", "monument", "heritage site", "ruins", "cathedral",
    "bazaar", "marketplace", "plaza", "promenade", "waterfront",
    "visa", "embassy", "consulate", "exchange rate", "travel insurance"
  ],

  "🎵 Music": [
    "vinyl", "bassline", "chorus", "symphony", "acoustic",
    "drumroll", "falsetto", "interlude", "melody", "tempo",
    "arpeggio", "cadence", "crescendo", "diminuendo", "fortissimo",
    "tremolo", "vibrato", "pizzicato", "staccato", "legato",
    "overture", "sonata", "concerto", "requiem", "nocturne",
    "ballad", "serenade", "anthem", "jingle", "lullaby",
    "riff", "hook", "bridge", "breakdown", "drop",
    "reverb", "distortion", "compression", "equalization", "mastering",
    "turntable", "synthesizer", "theremin", "harpsichord", "sitar",
    "didgeridoo", "marimba", "dulcimer", "zither", "hurdy-gurdy"
  ],

  "🎮 Video Games": [
    "respawn", "dungeon", "loot", "checkpoint", "glitch",
    "speedrun", "tutorial", "inventory", "sandbox", "boss",
    "crafting", "farming", "grinding", "raiding", "PvP",
    "DLC", "patch", "nerf", "buff", "meta",
    "hitbox", "cooldown", "aggro", "tank", "healer",
    "permadeath", "roguelike", "procedural", "open world", "cutscene",
    "achievement", "trophy", "leaderboard", "matchmaking", "ping",
    "narrative", "dialogue", "branching", "morality", "reputation",
    "side quest", "main quest", "fast travel", "waypoint", "minimap",
    "controller", "emulator", "modding", "overclocking", "frame rate"
  ],

  "🧪 Science": [
    "mitosis", "neutron", "catalyst", "molecule", "gravity",
    "orbit", "genome", "photon", "erosion", "membrane",
    "osmosis", "diffusion", "synthesis", "oxidation", "reduction",
    "hypothesis", "variable", "control", "placebo", "peer review",
    "quasar", "pulsar", "nebula", "supernova", "singularity",
    "isotope", "radioactive", "half-life", "fission", "fusion",
    "antibody", "antigen", "pathogen", "mutation", "chromosome",
    "tectonic", "seismic", "magnetic field", "ionosphere", "troposphere",
    "entropy", "thermodynamics", "kinetics", "equilibrium", "resonance",
    "quantum", "relativity", "uncertainty", "superposition", "entanglement"
  ],

  "🏛️ History": [
    "gladiator", "pharaoh", "crusade", "colony", "revolution",
    "siege", "treaty", "dynasty", "plague", "conquest",
    "renaissance", "reformation", "inquisition", "schism", "heresy",
    "feudalism", "serfdom", "guild", "merchant", "pilgrimage",
    "armistice", "embargo", "blockade", "tribunal", "manifesto",
    "propaganda", "censorship", "exile", "abdication", "succession",
    "colonialism", "imperialism", "annexation", "partition", "sovereignty",
    "abolition", "suffrage", "rebellion", "mutiny", "insurrection",
    "excavation", "artifact", "relic", "inscription", "hieroglyphic",
    "papyrus", "codex", "scroll", "mosaic", "fresco"
  ],

  "🧁 Desserts": [
    "churro", "macaron", "truffle", "sorbet", "custard",
    "praline", "mochi", "cannoli", "brownie", "parfait",
    "pavlova", "profiterole", "eclair", "tarte tatin", "clafoutis",
    "creme brulee", "panna cotta", "zabaglione", "semifreddo", "granita",
    "halva", "loukoumades", "knafeh", "basbousa", "umm ali",
    "gulab jamun", "jalebi", "kulfi", "rasgulla", "burfi",
    "mango sticky rice", "tong sui", "tang yuan", "nian gao", "wife cake",
    "brigadeiro", "alfajor", "dulce de leche", "tres leches", "churros",
    "rugelach", "babka", "sufganiyah", "hamantaschen", "mandelbrot",
    "lamington", "pavlova", "sticky date", "anzac biscuit", "hedgehog slice"
  ],

  "🌃 Cities": [
    "Tokyo", "Cairo", "Venice", "Nairobi", "Reykjavik",
    "Montreal", "Havana", "Istanbul", "Seoul", "Lisbon",
    "Lagos", "Kinshasa", "Casablanca", "Algiers", "Addis Ababa",
    "Karachi", "Dhaka", "Mumbai", "Chennai", "Kolkata",
    "Jakarta", "Manila", "Kuala Lumpur", "Bangkok", "Ho Chi Minh",
    "Bogota", "Lima", "Santiago", "Quito", "Caracas",
    "Warsaw", "Prague", "Budapest", "Bucharest", "Sofia",
    "Oslo", "Stockholm", "Helsinki", "Copenhagen", "Amsterdam",
    "Brussels", "Zurich", "Vienna", "Athens", "Dubrovnik",
    "Marrakech", "Tunis", "Accra", "Dakar", "Dar es Salaam"
  ],

  "🧠 Emotions": [
    "nostalgia", "euphoria", "envy", "dread", "longing",
    "awe", "guilt", "pride", "spite", "apathy",
    "melancholy", "elation", "remorse", "yearning", "contempt",
    "serenity", "anxiety", "frustration", "resentment", "gratitude",
    "schadenfreude", "saudade", "hiraeth", "mono no aware", "wabi-sabi",
    "fernweh", "wanderlust", "sehnsucht", "torschlusspanik", "weltschmerz",
    "vulnerability", "embarrassment", "shame", "humiliation", "mortification",
    "anticipation", "suspense", "curiosity", "wonder", "fascination",
    "boredom", "restlessness", "dissatisfaction", "disillusionment", "resignation",
    "tenderness", "compassion", "adoration", "devotion", "reverence"
  ]
};
