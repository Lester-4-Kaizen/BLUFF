const WORD_BANK = {

  "🐾 Animals": [
    "elephant", "penguin", "dolphin", "lion", "tiger",
    "panda", "cheetah", "octopus", "flamingo", "gorilla",
    "zebra", "koala", "giraffe", "crocodile", "kangaroo",
    "shark", "parrot", "eagle", "wolf", "bear",
    "rabbit", "monkey", "camel", "hippo", "rhino",
    "peacock", "jellyfish", "turtle", "scorpion", "bat",
    "deer", "fox", "owl", "seal", "whale",
    "horse", "cow", "chicken", "duck", "frog",
    "snake", "crab", "bee", "butterfly", "lizard",
    "hamster", "squirrel", "swan", "pigeon", "salmon"
  ],

  "🍕 Food & Drinks": [
    "pizza", "sushi", "burger", "noodles", "taco",
    "chocolate", "ice cream", "sandwich", "salad", "soup",
    "bread", "coffee", "cake", "rice", "egg",
    "cheese", "bacon", "steak", "shrimp", "dumpling",
    "pancake", "waffle", "donut", "cookie", "popcorn",
    "french fries", "hot dog", "pasta", "burrito", "ramen",
    "milk", "juice", "beer", "tea", "smoothie",
    "apple", "banana", "strawberry", "watermelon", "mango",
    "salmon", "chicken", "tofu", "mushroom", "avocado",
    "croissant", "kebab", "curry", "soda", "lemon"
  ],

  "⚽ Sports": [
    "football", "basketball", "tennis", "swimming", "boxing",
    "golf", "volleyball", "baseball", "cycling", "running",
    "skiing", "surfing", "wrestling", "archery", "rowing",
    "gymnastics", "judo", "karate", "fencing", "diving",
    "rugby", "cricket", "hockey", "badminton", "table tennis",
    "skateboarding", "snowboarding", "climbing", "bowling", "darts",
    "weightlifting", "shooting", "sailing", "polo", "curling",
    "triathlon", "marathon", "relay", "hurdles", "javelin",
    "long jump", "high jump", "discus", "kayaking", "BMX",
    "water polo", "handball", "lacrosse", "squash", "parkour"
  ],

  "🎬 Movies & TV": [
    "Titanic", "Avatar", "Frozen", "Lion King", "Shrek",
    "Inception", "Matrix", "Joker", "Avengers", "Batman",
    "Spider-Man", "Harry Potter", "Star Wars", "Jurassic Park", "Toy Story",
    "Finding Nemo", "Interstellar", "Gladiator", "Parasite", "Barbie",
    "Friends", "Breaking Bad", "Game of Thrones", "Squid Game", "Stranger Things",
    "The Office", "Oppenheimer", "Dune", "Moana", "Encanto",
    "Coco", "Up", "WALL-E", "Inside Out", "Minions",
    "Fast and Furious", "Mission Impossible", "James Bond", "The Notebook", "Twilight",
    "Wednesday", "Bridgerton", "Peaky Blinders", "Narcos", "Sherlock",
    "Black Mirror", "Euphoria", "Ted Lasso", "Succession", "Chernobyl"
  ],

  "💻 Technology": [
    "robot", "internet", "password", "keyboard", "screen",
    "camera", "battery", "charger", "Wi-Fi", "Bluetooth",
    "selfie", "emoji", "email", "website", "app",
    "virus", "hacker", "update", "download", "upload",
    "cloud", "drone", "satellite", "GPS", "touchscreen",
    "smartwatch", "headphones", "speaker", "printer", "scanner",
    "laptop", "tablet", "server", "backup", "pixel",
    "algorithm", "AI", "coding", "database", "firewall",
    "social media", "streaming", "podcast", "notification", "username",
    "login", "chip", "processor", "memory", "software"
  ],

  "🌿 Nature": [
    "volcano", "ocean", "forest", "desert", "river",
    "mountain", "waterfall", "rainbow", "thunder", "lightning",
    "earthquake", "tornado", "hurricane", "tsunami", "avalanche",
    "glacier", "cave", "island", "cliff", "beach",
    "lake", "swamp", "jungle", "savanna", "tundra",
    "sunrise", "sunset", "moon", "stars", "clouds",
    "snow", "rain", "fog", "wind", "flood",
    "coral reef", "canyon", "valley", "plateau", "lagoon",
    "geyser", "aurora", "tide", "dune", "mangrove",
    "wildfire", "drought", "seasons", "soil", "fossil"
  ],

  "💼 Occupations": [
    "doctor", "teacher", "pilot", "chef", "firefighter",
    "police officer", "nurse", "lawyer", "engineer", "artist",
    "dentist", "farmer", "soldier", "scientist", "actor",
    "singer", "driver", "builder", "sailor", "astronaut",
    "photographer", "journalist", "judge", "banker", "designer",
    "plumber", "electrician", "mechanic", "carpenter", "barber",
    "librarian", "security guard", "postman", "waiter", "cashier",
    "pharmacist", "surgeon", "coach", "referee", "lifeguard",
    "architect", "programmer", "accountant", "psychologist", "vet",
    "translator", "detective", "musician", "painter", "dancer"
  ],

  "✈️ Travel": [
    "airport", "passport", "hotel", "luggage", "ticket",
    "beach", "museum", "map", "tour guide", "souvenir",
    "visa", "customs", "boarding", "taxi", "train",
    "cruise", "camping", "backpack", "hostel", "resort",
    "landmark", "monument", "ruins", "cathedral", "market",
    "ferry", "bus", "highway", "border", "check-in",
    "jet lag", "layover", "safari", "road trip", "hot air balloon",
    "waterpark", "theme park", "zoo", "aquarium", "sunscreen",
    "mosquito", "time zone", "local food", "exchange rate", "travel insurance"
  ],

  "🎵 Music": [
    "guitar", "piano", "drums", "violin", "microphone",
    "concert", "song", "melody", "beat", "lyrics",
    "album", "band", "singer", "DJ", "bass",
    "trumpet", "flute", "harp", "saxophone", "keyboard",
    "chorus", "verse", "bridge", "remix", "cover",
    "live show", "festival", "tour", "record", "playlist",
    "earphones", "speaker", "vinyl", "radio", "rap",
    "jazz", "rock", "pop", "classical", "tempo",
    "rhythm", "harmony", "solo", "duet", "music video",
    "streaming", "autotune", "Grammy", "fan", "rehearsal"
  ],

  "🎮 Video Games": [
    "Mario", "Minecraft", "Fortnite", "Roblox", "Pokemon",
    "Zelda", "FIFA", "Call of Duty", "Among Us", "GTA",
    "controller", "joystick", "level", "boss", "health bar",
    "respawn", "game over", "cheat code", "save point", "loot",
    "inventory", "multiplayer", "sandbox", "open world", "dungeon",
    "quest", "mission", "cutscene", "tutorial", "leaderboard",
    "achievement", "skin", "DLC", "patch", "speedrun",
    "glitch", "sniper", "reload", "crafting", "farming",
    "PvP", "esports", "streaming", "console", "PC gaming",
    "mobile game", "arcade", "retro", "co-op", "character"
  ],

  "🧪 Science": [
    "gravity", "atom", "DNA", "cell", "virus",
    "evolution", "black hole", "solar system", "photosynthesis", "volcano",
    "magnet", "electricity", "radiation", "chemical", "reaction",
    "experiment", "microscope", "telescope", "rocket", "orbit",
    "planet", "galaxy", "asteroid", "comet", "star",
    "blood", "brain", "heart", "bone", "muscle",
    "oxygen", "carbon dioxide", "hydrogen", "water", "acid",
    "crystal", "laser", "X-ray", "vaccine", "clone",
    "mutation", "fossil", "extinction", "ecosystem", "ocean floor",
    "lightning", "tornado", "earthquake", "tsunami", "nitrogen"
  ],

  "🏛️ History": [
    "pyramid", "gladiator", "pirate", "knight", "samurai",
    "Viking", "pharaoh", "emperor", "revolution", "war",
    "castle", "throne", "crown", "sword", "cannon",
    "Columbus", "Napoleon", "Cleopatra", "Caesar", "Gandhi",
    "World War", "Cold War", "moon landing", "slavery", "democracy",
    "plague", "famine", "empire", "colony", "treaty",
    "election", "protest", "independence", "invasion", "ancient Rome",
    "ancient Egypt", "Middle Ages", "Renaissance", "Industrial Revolution", "Olympic Games",
    "Silk Road", "printing press", "gunpowder", "compass", "Titanic",
    "Berlin Wall", "apartheid", "Holocaust", "atomic bomb", "space race"
  ],

  "🧁 Desserts": [
    "chocolate cake", "ice cream", "donut", "brownie", "cookie",
    "cupcake", "cheesecake", "pudding", "pie", "waffle",
    "pancake", "crepe", "macaron", "eclair", "muffin",
    "lollipop", "gummy bear", "marshmallow", "cotton candy", "candy bar",
    "tart", "cinnamon roll", "banana bread", "shortcake", "tiramisu",
    "mousse", "sorbet", "gelato", "popsicle", "flan",
    "churro", "baklava", "mochi", "profiterole", "Swiss roll",
    "red velvet", "carrot cake", "lemon tart", "milkshake", "caramel",
    "toffee", "fudge", "meringue", "custard", "whipped cream",
    "jam", "honey", "hot chocolate", "fruit salad", "croissant"
  ],

  "🌃 Cities": [
    "Tokyo", "Paris", "New York", "London", "Dubai",
    "Rome", "Sydney", "Barcelona", "Istanbul", "Bangkok",
    "Singapore", "Cairo", "Mumbai", "Los Angeles", "Toronto",
    "Berlin", "Amsterdam", "Seoul", "Mexico City", "Buenos Aires",
    "Nairobi", "Lagos", "Cape Town", "Casablanca", "Marrakech",
    "Athens", "Prague", "Vienna", "Budapest", "Lisbon",
    "Moscow", "Beijing", "Shanghai", "Hong Kong", "Taipei",
    "Jakarta", "Manila", "Kuala Lumpur", "Ho Chi Minh", "Hanoi",
    "Rio de Janeiro", "Lima", "Bogota", "Santiago", "Havana",
    "Reykjavik", "Oslo", "Stockholm", "Copenhagen", "Helsinki"
  ],

  "🧠 Emotions": [
    "happy", "sad", "angry", "scared", "surprised",
    "nervous", "excited", "bored", "confused", "proud",
    "embarrassed", "jealous", "lonely", "grateful", "hopeful",
    "anxious", "relaxed", "frustrated", "disgusted", "guilty",
    "love", "hate", "fear", "joy", "grief",
    "shame", "regret", "trust", "doubt", "wonder",
    "nostalgia", "hope", "despair", "envy", "relief",
    "shock", "calm", "rage", "panic", "content",
    "inspired", "tired", "overwhelmed", "curious", "confident",
    "heartbroken", "homesick", "missing someone", "in love", "betrayed"
  ],

  "🎨 Artists": [
    "Leonardo da Vinci", "Picasso", "Van Gogh", "Michelangelo", "Rembrandt",
    "Frida Kahlo", "Andy Warhol", "Salvador Dali", "Claude Monet", "Banksy",
    "Beyoncé", "Michael Jackson", "Taylor Swift", "Ed Sheeran", "Adele",
    "Eminem", "Drake", "Rihanna", "Lady Gaga", "Bruno Mars",
    "BTS", "Blackpink", "Bad Bunny", "The Weeknd", "Billie Eilish",
    "Harry Styles", "Dua Lipa", "Ariana Grande", "Justin Bieber", "Shakira",
    "Kendrick Lamar", "Kanye West", "Jay-Z", "Coldplay", "Radiohead",
    "Bob Marley", "Elvis Presley", "David Bowie", "Freddie Mercury", "Madonna",
    "The Beatles", "Rolling Stones", "ABBA", "Elton John", "Frank Sinatra",
    "Whitney Houston", "Mariah Carey", "Celine Dion", "Stevie Wonder", "Prince"
  ]

};
