// -------------------------
// Global Variables
// -------------------------
let cart = [];
let isLoggedIn = false;
let currentUser = null;

// -------------------------
// Login & Authentication
// -------------------------
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    if (username && password) {
        isLoggedIn = true;
        currentUser = username;
        
        // Hide login section completely
        document.getElementById('login').classList.remove('active');
        
        // Show navbar and go directly to feed (or any default section)
        document.getElementById('navbar').style.display = 'flex';
        
        // Show feed section by default instead of profile
        document.getElementById('feed').classList.add('active');
        
        // Initialize feed content
        initializeFeed();
        
        alert('Login successful! Welcome to your dashboard.');
        
        // Clear login form
        document.getElementById('login-username').value = '';
        document.getElementById('login-password').value = '';
    } else {
        alert('Please enter both username and password.');
    }
}

function signup() {
    const name = document.getElementById('signup-name').value;
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (name && username && email && password) {
        alert('Account created successfully! Please login.');
        hideSignup();
        
        // Clear signup form
        document.getElementById('signup-name').value = '';
        document.getElementById('signup-username').value = '';
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
    } else {
        alert('Please fill all fields.');
    }
}

function forgotPassword() {
    const email = document.getElementById('forgot-email').value;
    if (email) {
        alert('Password reset link sent to your email!');
        hideForgot();
        document.getElementById('forgot-email').value = '';
    } else {
        alert('Please enter your email address.');
    }
}

// -------------------------
// Section Switching
// -------------------------
function showSection(id) {
    if (!isLoggedIn && id !== 'login') {
        alert('Please login first!');
        return;
    }
    
    // Hide all main sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show the selected section
    document.getElementById(id).classList.add('active');
    
    // Initialize section content if needed
    if (id === 'feed' && document.getElementById('feed-container').children.length === 0) {
        initializeFeed();
    }
    if (id === 'projects' && document.getElementById('project-list').children.length === 0) {
        initializeProjects();
    }
    if (id === 'workshops' && document.getElementById('workshop-list').children.length === 0) {
        initializeWorkshops();
    }
    if (id === 'courses' && document.getElementById('courses-list').children.length === 0) {
        initializeCourses();
    }
    if (id === 'shopping' && document.getElementById('products-list').children.length === 0) {
        initializeShopping();
    }
    if (id === 'profile') {
        // Profile section can still be accessed manually through navbar
        // But it's no longer the default after login
    }
}

// -------------------------
// Login / Signup / Forgot Password
// -------------------------
const loginBox = document.querySelector('.login-box');
const signupBox = document.getElementById('signup-box');
const forgotBox = document.getElementById('forgot-box');

function showSignup() {
    loginBox.classList.add('hidden');
    signupBox.classList.remove('hidden');
    forgotBox.classList.add('hidden');
}

function hideSignup() {
    signupBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
}

function showForgot() {
    loginBox.classList.add('hidden');
    forgotBox.classList.remove('hidden');
    signupBox.classList.add('hidden');
}

function hideForgot() {
    forgotBox.classList.add('hidden');
    loginBox.classList.remove('hidden');
}
// -------------------------
// Feed Posts
// -------------------------
const feedPosts = [
    {
        name: "Ravi Kasaudhan",
        username: "@ravikasaudhan",
        content: "Just launched my new startup 🚀 #DevConnect - Connecting developers worldwide! So excited for this journey!",
        img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop",
        likes: 42,
        comments: 8,
        shares: 3,
        time: "2 hours ago"
    },
    {
        name: "Ritesh Rai",
        username: "@riteshrai",
        content: "Built an AI-powered financial analytics platform! Processing millions of transactions in real-time. #AI #Finance",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        likes: 89,
        comments: 15,
        shares: 7,
        time: "5 hours ago"
    },
    {
        name: "Akshat Rajput",
        username: "@akshatrajput",
        content: "Just deployed our blockchain-based voting system! Secure, transparent, and tamper-proof elections are here! #Blockchain #Web3",
        img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
        likes: 156,
        comments: 23,
        shares: 12,
        time: "1 day ago"
    },
    {
        name: "Riya Khanna",
        username: "@riyakhanna",
        content: "Our healthcare AI model just achieved 99.2% accuracy in early disease detection! Proud of my team! #HealthcareAI #MachineLearning",
        img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
        likes: 234,
        comments: 45,
        shares: 28,
        time: "1 day ago"
    },
    {
        name: "Rishu Kumar",
        username: "@rishukumar",
        content: "Launched our new ed-tech platform with personalized learning paths using AI! Education revolution begins! #EdTech #AI",
        img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        likes: 178,
        comments: 34,
        shares: 19,
        time: "2 days ago"
    },
    {
        name: "Elon Musk",
        username: "@elonmusk",
        content: "Starship orbital test successful! Mars mission getting closer than ever before 🚀 #SpaceX #Mars",
        img: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
        likes: 345000,
        comments: 28900,
        shares: 156000,
        time: "1 hour ago"
    },
    {
        name: "Sundar Pichai",
        username: "@sundarpichai",
        content: "Google AI creating music compositions that rival human artists! AI creativity reaching new heights 🎵 #GoogleAI #MusicTech",
        img: "https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif",
        likes: 234000,
        comments: 15600,
        shares: 89000,
        time: "3 hours ago"
    },
    {
        name: "Virat Kohli",
        username: "@imVkohli",
        content: "Launching sports tech startup using computer vision to analyze athlete performance in real-time! Revolutionizing sports training 🏏 #SportsTech",
        img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop",
        likes: 890000,
        comments: 78000,
        shares: 234000,
        time: "4 hours ago"
    },
    {
        name: "Cristiano Ronaldo",
        username: "@cristiano",
        content: "CR7 Fitness Tech launching smart gyms with AI personal trainers and biometric tracking! Fitness revolution begins 💪 #FitnessTech",
        img: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=600&h=400&fit=crop",
        likes: 1200000,
        comments: 89000,
        shares: 456000,
        time: "6 hours ago"
    },
    {
        name: "Jeff Bezos",
        username: "@jeffbezos",
        content: "Blue Origin's lunar lander prototype completing successful test flights! Moon colonization becoming reality 🌙 #BlueOrigin #Space",
        img: "https://media.giphy.com/media/26uf759LlDftqZNVm/giphy.gif",
        likes: 234000,
        comments: 15600,
        shares: 78000,
        time: "7 hours ago"
    },
    {
        name: "Mark Zuckerberg",
        username: "@zuck",
        content: "Meta's holographic meetings in Metaverse - feeling like you're in the same room despite being continents apart! #Metaverse #VR",
        img: "https://media.giphy.com/media/j3tc7dn0DbQ7aKcC1d/giphy.gif",
        likes: 189000,
        comments: 23400,
        shares: 67000,
        time: "5 hours ago"
    },
    {
        name: "Narendra Modi",
        username: "@narendramodi",
        content: "India's Digital Public Infrastructure now being adopted globally! UPI, Aadhaar, ONDC transforming digital ecosystems worldwide 🌍 #DigitalIndia",
        img: "https://images.unsplash.com/photo-1593113630400-ea4288922497?w=600&h=400&fit=crop",
        likes: 567000,
        comments: 45600,
        shares: 234000,
        time: "2 hours ago"
    },
    {
        name: "Mukesh Ambani",
        username: "@mukeshambani",
        content: "JioSpaceFiber launching satellite internet across India! Bridging the digital divide in remotest areas 📡 #Jio #SatelliteInternet",
        img: "https://images.unsplash.com/photo-1563013541-2d2c1c5c20ca?w=600&h=400&fit=crop",
        likes: 123000,
        comments: 8900,
        shares: 34000,
        time: "4 hours ago"
    },
    {
        name: "Satya Nadella",
        username: "@satyanadella",
        content: "Microsoft Copilot now writing code, creating presentations, and analyzing data autonomously! AI revolution is here 🤖 #MicrosoftAI",
        img: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 45000,
        time: "6 hours ago"
    },
    {
        name: "Tim Cook",
        username: "@tim_cook",
        content: "Apple Vision Pro transforming how we interact with digital content - spatial computing is the future! 🕶️ #AppleVisionPro",
        img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 23400,
        shares: 67000,
        time: "9 hours ago"
    },
    {
        name: "Bill Gates",
        username: "@billgates",
        content: "Gates Foundation developing AI models to predict and prevent future pandemics! Global health security strengthened 🩺 #HealthTech",
        img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 67000,
        time: "5 hours ago"
    },
    {
        name: "Warren Buffett",
        username: "@warrenbuffett",
        content: "Berkshire investing in renewable energy tech startups! Sustainable energy is the future of investing 🌞 #CleanEnergy",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 45000,
        time: "6 hours ago"
    },
    {
        name: "Jack Ma",
        username: "@jackma",
        content: "Alibaba Cloud expanding AI services across Southeast Asia! Democratizing artificial intelligence for businesses 🤖 #AlibabaCloud",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 34000,
        time: "7 hours ago"
    },
    {
        name: "Richard Branson",
        username: "@richardbranson",
        content: "Virgin Galactic launching space tourism packages! Making space accessible to everyone 🌌 #SpaceTourism",
        img: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 78000,
        time: "8 hours ago"
    },
    {
        name: "Sam Altman",
        username: "@samaltman",
        content: "OpenAI developing AGI that can reason, learn, and create like humans! The future of artificial intelligence is here 🧠 #AGI",
        img: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=600&h=400&fit=crop",
        likes: 345000,
        comments: 28900,
        shares: 156000,
        time: "9 hours ago"
    },
    {
        name: "Jensen Huang",
        username: "@jensenhuang",
        content: "NVIDIA's new AI chips processing data 100x faster! Accelerating the AI revolution worldwide 🚀 #NVIDIA #AI",
        img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 89000,
        time: "2 hours ago"
    },
    {
        name: "Lisa Su",
        username: "@lisasu",
        content: "AMD processors powering the world's fastest supercomputers! Breaking computational barriers every day 💻 #AMD",
        img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 67000,
        time: "3 hours ago"
    },
    {
        name: "Brian Chesky",
        username: "@brianchesky",
        content: "Airbnb launching AI-powered travel planning with personalized itineraries! Revolutionizing travel experiences ✈️ #AirbnbAI",
        img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 45000,
        time: "4 hours ago"
    },
    {
        name: "Daniel Ek",
        username: "@daniel ek",
        content: "Spotify AI creating personalized concert experiences with holographic performances! Music reimagined 🎵 #SpotifyAI",
        img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 78000,
        time: "5 hours ago"
    },
    {
        name: "Reed Hastings",
        username: "@reedhastings",
        content: "Netflix developing interactive movies where viewers choose the plot! Storytelling revolutionized 🎬 #InteractiveContent",
        img: "https://images.unsplash.com/photo-1489599809505-7c8e1c75ce13?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 67000,
        time: "6 hours ago"
    },
    {
        name: "Susan Wojcicki",
        username: "@susanwojcicki",
        content: "YouTube launching AI-powered content creation tools for creators! Democratizing video production 🎥 #YouTubeAI",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 45000,
        time: "7 hours ago"
    },
    {
        name: "Andy Jassy",
        username: "@andyjassy",
        content: "AWS launching quantum computing as a service! Making quantum power accessible to all developers ⚛️ #AWSQuantum",
        img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 67000,
        time: "9 hours ago"
    },
    {
        name: "Arvind Krishna",
        username: "@arvindkrishna",
        content: "IBM quantum computers solving complex optimization problems! Quantum advantage achieved 🔬 #IBMQuantum",
        img: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 45000,
        time: "2 hours ago"
    },
    {
        name: "Shantanu Narayen",
        username: "@shantanunarayen",
        content: "Adobe Firefly generating stunning AI artwork! Creativity meets artificial intelligence 🎨 #AdobeAI",
        img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 78000,
        time: "3 hours ago"
    },
    {
        name: "Ginni Rometty",
        username: "@ginnirometty",
        content: "AI ethics framework adopted by 100+ global companies! Responsible AI development is crucial ⚖️ #AIEthics",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 67000,
        time: "4 hours ago"
    },
    {
        name: "Meg Whitman",
        username: "@megwhitman",
        content: "Quantum computing startups raising record funding! Quantum winter is over, spring is here 🌱 #QuantumComputing",
        img: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop",
        likes: 156000,
        comments: 12000,
        shares: 45000,
        time: "5 hours ago"
    },
    {
        name: "Ursula Burns",
        username: "@ursulaburns",
        content: "Diversity in tech improving with AI-powered recruitment tools! Building inclusive workplaces 🤝 #DiversityInTech",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
        likes: 234000,
        comments: 18900,
        shares: 89000,
        time: "6 hours ago"
    },
    {
        name: "Indra Nooyi",
        username: "@indranooyi",
        content: "Sustainable packaging using AI to reduce waste by 80%! Technology serving the planet 🌍 #Sustainability",
        img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop",
        likes: 189000,
        comments: 15600,
        shares: 67000,
        time: "7 hours ago"
    },
    {
        name: "Deepika Padukone",
        username: "@deepikapadukone",
        content: "Launching AI-powered mental health platform with real-time emotion recognition technology! Mental healthcare revolutionized 💙 #AIforGood",
        img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
        likes: 456000,
        comments: 34000,
        shares: 123000,
        time: "3 hours ago"
    },
    {
        name: "Priyanka Chopra",
        username: "@priyankachopra",
        content: "Producing sci-fi series with fully virtual sets using Unreal Engine 5! Film production transformed by real-time technology 🎥 #VirtualProduction",
        img: "https://images.unsplash.com/photo-1489599809505-7c8e1c75ce13?w=600&h=400&fit=crop",
        likes: 567000,
        comments: 45000,
        shares: 156000,
        time: "5 hours ago"
    },
    {
        name: "Shah Rukh Khan",
        username: "@iamsrk",
        content: "Red Chillies VFX creating India's first fully AI-generated movie character! Bollywood meets cutting-edge AI 🎬 #BollywoodVFX",
        img: "https://images.unsplash.com/photo-1489599809505-7c8e1c75ce13?w=600&h=400&fit=crop",
        likes: 890000,
        comments: 78000,
        shares: 234000,
        time: "8 hours ago"
    },
    {
        name: "Amitabh Bachchan",
        username: "@amitabhbachchan",
        content: "Investing in Indian deep tech startups working on quantum computing and neuromorphic chips! Building India's tech future 🇮🇳 #DeepTech",
        img: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&h=400&fit=crop",
        likes: 345000,
        comments: 28000,
        shares: 89000,
        time: "7 hours ago"
    },
    {
        name: "Anushka Sharma",
        username: "@anushkasharma",
        content: "Our clean beauty brand now using AI to create hyper-personalized skincare formulas based on DNA analysis! #BeautyTech #AI",
        img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&h=400&fit=crop",
        likes: 456000,
        comments: 34000,
        shares: 89000,
        time: "8 hours ago"
    },
    {
        name: "Ranveer Singh",
        username: "@ranveersingh",
        content: "Launching fashion tech platform with AR try-ons and AI style recommendations! Revolutionizing online shopping 👗 #FashionTech",
        img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
        likes: 678000,
        comments: 56000,
        shares: 156000,
        time: "2 hours ago"
    },
    {
        name: "Alia Bhatt",
        username: "@aliaabhatt",
        content: "Eco-fashion brand implementing blockchain for supply chain transparency! Sustainable fashion meets Web3 technology 🌿 #EcoFashion",
        img: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=600&h=400&fit=crop",
        likes: 567000,
        comments: 45000,
        shares: 123000,
        time: "3 hours ago"
    },
    {
        name: "Ratan Tata",
        username: "@ratantata",
        content: "Tata Trusts funding AI research for predicting natural disasters and climate change impacts! Technology for humanity 🌍 #AIforGood",
        img: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop",
        likes: 456000,
        comments: 34000,
        shares: 89000,
        time: "4 hours ago"
    }
];

function initializeFeed() {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = '';

    feedPosts.forEach((post, index) => {
        const div = document.createElement("div");
        div.className = "post-card";
        div.innerHTML = `
            <div class="post-header">
                <div class="user-info">
                    <h3>${post.name}</h3>
                    <span class="username">${post.username} • ${post.time}</span>
                </div>
                <div class="avatar-circle">
                    ${post.name.split(' ').map(n => n[0]).join('')}
                </div>
            </div>
            <p class="post-content">${post.content}</p>
            <img src="${post.img}" alt="Post Image" class="post-image">
            <div class="post-stats">
                <span>${post.likes} likes</span>
                <span>${post.comments} comments</span>
                <span>${post.shares} shares</span>
            </div>
            <div class="post-actions">
                <button onclick="likePost(${index})">
                    <i class="fas fa-thumbs-up"></i> Like
                </button>
                <button onclick="toggleComments(${index})">
                    <i class="fas fa-comment"></i> Comment
                </button>
                <button onclick="sharePost(${index})">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
            <div class="comments-section hidden" id="comments-${index}">
                <div class="comment-input">
                    <input type="text" id="comment-input-${index}" placeholder="Write a comment...">
                    <button onclick="addComment(${index})">Post</button>
                </div>
                <div class="comments-list" id="comments-list-${index}"></div>
            </div>
        `;
        feedContainer.appendChild(div);
    });
}

function likePost(index) {
    feedPosts[index].likes++;
    updatePostStats(index);
    alert(`You liked ${feedPosts[index].name}'s post!`);
}

function toggleComments(index) {
    const commentsSection = document.getElementById(`comments-${index}`);
    commentsSection.classList.toggle('hidden');
    if (!commentsSection.classList.contains('hidden')) {
        document.getElementById(`comment-input-${index}`).focus();
    }
}

function sharePost(index) {
    feedPosts[index].shares++;
    updatePostStats(index);
    alert(`You shared ${feedPosts[index].name}'s post! Total shares: ${feedPosts[index].shares}`);
}

function updatePostStats(index) {
    const post = feedPosts[index];
    const postElement = document.getElementById("feed-container").children[index];
    const statsElement = postElement.querySelector('.post-stats');
    statsElement.innerHTML = `
        <span>${post.likes} likes</span>
        <span>${post.comments} comments</span>
        <span>${post.shares} shares</span>
    `;
}

function addComment(postIndex) {
    const input = document.getElementById(`comment-input-${postIndex}`);
    const comment = input.value.trim();
    
    if (comment) {
        feedPosts[postIndex].comments++;
        const commentsList = document.getElementById(`comments-list-${postIndex}`);
        
        const commentDiv = document.createElement("div");
        commentDiv.className = "comment";
        commentDiv.innerHTML = `
            <strong>You:</strong> ${comment}
            <span class="comment-time">just now</span>
        `;
        
        commentsList.appendChild(commentDiv);
        input.value = "";
        updatePostStats(postIndex);
    }
}

// -------------------------
// Projects
// -------------------------
const projects = [
    {
        title: "Water Quality Prediction",
        description: "AI-powered model to predict water quality based on dataset features.",
        img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
        link: "https://github.com/ravivit/water-quality-prediction"
    },
    {
        title: "LifeSync Ambulance System",
        description: "Smart ambulance tracking and alert system.",
        img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        link: "https://github.com/ravivit/lifesync"
    },
    {
        title: "AI Chatbot",
        description: "Chatbot using NLP for customer support.",
        img: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400&h=300&fit=crop",
        link: "https://github.com/ravivit/ai-chatbot"
    },
    {
        title: "Weather Prediction App",
        description: "Predicts weather using ML models.",
        img: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=300&fit=crop",
        link: "https://github.com/ravivit/weather-app"
    },
    {
        title: "Portfolio Website",
        description: "Personal portfolio built with HTML, CSS, JS.",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        link: "https://ravivit.github.io/portfolio"
    },
    {
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce website with payment gateway.",
        img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
        link: "https://github.com/ravivit/ecommerce-platform"
    }
];

function initializeProjects() {
    const projectList = document.getElementById("project-list");
    projectList.innerHTML = '';

    projects.forEach(project => {
        const div = document.createElement("div");
        div.className = "project-card";
        div.innerHTML = `
            <img src="${project.img}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <a href="${project.link}" target="_blank">View Project</a>
        `;
        projectList.appendChild(div);
    });
}

// -------------------------
// Workshops
// -------------------------
const workshops = [
    {
        name: "AI in Education Workshop",
        date: "5 January 2026",
        desc: "Learn how AI is transforming education",
        image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Web Development Bootcamp",
        date: "6 January 2026",
        desc: "Full-stack web development in 5 days",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Data Science Fundamentals",
        date: "7 January 2026",
        desc: "Introduction to data analysis and visualization",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Mobile App Development",
        date: "8 January 2026",
        desc: "Build cross-platform apps with Flutter",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Drone Technology & Programming",
        date: "9 January 2026",
        desc: "Master drone programming and autonomous flight",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "AI Robotics Workshop",
        date: "10 January 2026",
        desc: "Hands-on experience with AI-powered robotics",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Cyber Security Masterclass",
        date: "11 January 2026",
        desc: "Learn advanced cybersecurity techniques and ethical hacking",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Cloud Computing with AWS",
        date: "12 January 2026",
        desc: "Master AWS services and cloud infrastructure",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Blockchain Development",
        date: "13 January 2026",
        desc: "Build decentralized applications with Ethereum",
        image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Machine Learning Advanced",
        date: "14 January 2026",
        desc: "Deep dive into neural networks and deep learning",
        image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Metaverse Development",
        date: "15 January 2026",
        desc: "Create virtual worlds and 3D interactive experiences", 
        image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Digital Marketing AI Tools",
        date: "16 January 2026",
        desc: "Leverage AI for digital marketing strategies",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

function initializeWorkshops() {
    const workshopList = document.getElementById("workshop-list");
    workshopList.innerHTML = '';

    workshops.forEach(workshop => {
        const div = document.createElement("div");
        div.className = "workshop-card";
        div.innerHTML = `
            <img src="${workshop.image}" alt="${workshop.name}" style="width:100%; height:200px; object-fit:cover; border-radius:8px 8px 0 0;">
            <div style="padding:15px;">
                <h3>${workshop.name}</h3>
                <p><strong>Date:</strong> ${workshop.date}</p>
                <p>${workshop.desc}</p>
                <button onclick="registerWorkshop('${workshop.name}')" style="background:#8B5CF6; color:white; border:none; padding:10px 20px; border-radius:5px; cursor:pointer; font-weight:bold;">Register Now</button>
            </div>
        `;
        workshopList.appendChild(div);
    });
}

function registerWorkshop(workshopName) {
    alert(`Successfully registered for ${workshopName}!`);
}
// -------------------------
// Courses
// -------------------------
const courses = [
    {
        name: "JavaScript Mastery",
        description: "Complete JavaScript course from basics to advanced",
        img: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop"
    },
    {
        name: "Data Structures & Algorithms",
        description: "Master DSA for coding interviews",
        img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
    },
    {
        name: "Web Development",
        description: "Full-stack web development course",
        img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
    },
    {
        name: "Flutter Development",
        description: "Build cross-platform mobile apps",
        img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
    },
    {
        name: "Python Programming",
        description: "Learn Python for data science and web development",
        img: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=300&fit=crop"
    },
    {
        name: "Machine Learning",
        description: "Introduction to ML algorithms and applications",
        img: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop"
    }
];

function initializeCourses() {
    const coursesList = document.getElementById("courses-list");
    coursesList.innerHTML = '';

    courses.forEach(course => {
        const div = document.createElement("div");
        div.className = "course-card";
        div.innerHTML = `
            <img src="${course.img}" alt="${course.name}">
            <h3>${course.name}</h3>
            <p>${course.description}</p>
            <button onclick="enrollCourse('${course.name}')">Enroll Now</button>
        `;
        coursesList.appendChild(div);
    });
}

function enrollCourse(courseName) {
    alert(`Successfully enrolled in ${courseName}!`);
}

// -------------------------
// Shopping
// -------------------------
const products = [
    {
        name: "Laptop",
        price: 45999,
        img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop"
    },
    {
        name: "Keyboard",
        price: 2499,
        img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"
    },
    {
        name: "Mouse",
        price: 899,
        img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"
    },
    {
        name: "Bottle",
        price: 499,
        img: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=400&h=300&fit=crop"
    },
    {
        name: "LED Light",
        price: 1299,
        img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
        name: "Headphones",
        price: 1999,
        img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
    },
    {
        name: "Smartwatch",
        price: 5999,
        img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
    },
    {
        name: "Course Combo Pack",
        price: 9999,
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    }
];

function initializeShopping() {
    const productsList = document.getElementById("products-list");
    productsList.innerHTML = '';

    products.forEach((product, index) => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">₹${product.price}</div>
            <button onclick="addToCart(${index})">Add to Cart</button>
        `;
        productsList.appendChild(div);
    });
}

function addToCart(productIndex) {
    const product = products[productIndex];
    cart.push(product);
    updateCartSummary();
    alert(`${product.name} added to cart!`);
}

function updateCartSummary() {
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");
    
    cartCount.textContent = cart.length;
    cartTotal.textContent = cart.reduce((total, product) => total + product.price, 0);
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const total = cart.reduce((sum, product) => sum + product.price, 0);
    alert(`Order placed successfully! Total: ₹${total}\nThank you for your purchase!`);
    cart = [];
    updateCartSummary();
}

// -------------------------
// AI Chatbot
// -------------------------
const aiResponses = {
    "hello": "Hello! How can I assist you with your education journey today?",
    "hi": "Hi there! I'm your EduConnect AI assistant. What can I help you with?",
    "projects": "We have several project ideas: AI Learning Platform, Campus Connect App, Virtual Lab Simulator, and Career Path Predictor. Which one interests you?",
    "workshops": "Our upcoming workshops include: AI in Education, Web Development Bootcamp, Data Science Fundamentals, and Mobile App Development.",
    "courses": "We offer courses in JavaScript, DSA, Web Development, Flutter, Python, and Machine Learning. Which one would you like to learn?",
    "career": "Based on current trends, careers in AI, Data Science, Full-Stack Development, and Cybersecurity are highly promising. Would you like more specific guidance?",
    "coding": "Great! Coding is an essential skill. We recommend starting with Python for beginners, then moving to web development with HTML/CSS/JavaScript.",
    "help": "I can help you with: project ideas, workshop information, career guidance, coding resources, and general education advice. What do you need?",
    "thanks": "You're welcome! Feel free to ask if you have more questions.",
    "default": "I'm not sure I understand. Could you rephrase that? I can help with projects, workshops, career advice, and coding resources."
};

function sendMessage() {
    const chatInput = document.getElementById("chat-input");
    const message = chatInput.value.trim();
    
    if (message === "") return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = "";
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate AI response after delay
    setTimeout(() => {
        hideTypingIndicator();
        const response = getAIResponse(message);
        addMessage(response, false);
    }, 1500);
}

function addMessage(message, isUser = false) {
    const chatContainer = document.getElementById("chat-container");
    
    const messageDiv = document.createElement("div");
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const now = new Date();
    const timeString = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    messageDiv.innerHTML = `
        <div class="message-bubble">
            <p>${message}</p>
            <div class="message-time">${timeString}</div>
        </div>
    `;
    
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.createElement("div");
    typingIndicator.className = "chat-message bot-message";
    typingIndicator.id = "typing-indicator";
    typingIndicator.innerHTML = `
        <div class="typing-indicator">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    document.getElementById("chat-container").appendChild(typingIndicator);
    document.getElementById("chat-container").scrollTop = document.getElementById("chat-container").scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function getAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [key, response] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return aiResponses.default;
}

// Allow sending message with Enter key
document.getElementById("chat-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// -------------------------
// Profile
// -------------------------
document.getElementById("uploadPic").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("previewImg").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById("profileForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const college = document.getElementById("college").value;
    const age = document.getElementById("age").value;
    const leetcode = document.getElementById("leetcode").value;
    const linkedin = document.getElementById("linkedin").value;
    const github = document.getElementById("github").value;
    
    const profileDisplay = document.getElementById("profileDisplay");
    profileDisplay.innerHTML = `
        <img src="${document.getElementById("previewImg").src}" alt="Profile">
        <h3>${name}</h3>
        <p><strong>College:</strong> ${college}</p>
        <p><strong>Age:</strong> ${age}</p>
        ${leetcode ? `<p><strong>LeetCode:</strong> <a href="${leetcode}" target="_blank">${leetcode}</a></p>` : ''}
        ${linkedin ? `<p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>` : ''}
        ${github ? `<p><strong>GitHub:</strong> <a href="${github}" target="_blank">${github}</a></p>` : ''}
    `;
    profileDisplay.classList.remove("hidden");
    
    alert('Profile saved successfully! You can now explore all sections.');
    
    // Clear form
    document.getElementById("profileForm").reset();
});

// -------------------------
// Initialize on load
// -------------------------
document.addEventListener('DOMContentLoaded', function() {
    // Hide navbar initially
    document.getElementById('navbar').style.display = 'none';
    
    // Show login section
    document.getElementById('login').classList.add('active');
});