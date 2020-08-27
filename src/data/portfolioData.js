import salesAppDescription from './descriptions/salesApp';
import mooseGameDescription from './descriptions/mooseGame';
import chatAppDescription from './descriptions/chatApp';
import portfolioDescription from './descriptions/portfolio';

export const CDN_PREFIX = 'https://s3.ca-central-1.amazonaws.com/cdn.matthewmeade.ca/portfolio';
export const cdnImg = (p) => `${CDN_PREFIX}/${p}`;

export const portfolioItems = [
    {
        title: 'Sales App',
        gitHub: 'https://github.com/mafumeade/GKSales',
        url: 'https://gksales.herokuapp.com',
        urlText: 'Open Demo',
        description: salesAppDescription.trim(),
        coverImage: cdnImg('salesApp/desktop/dashboard.png'),
        mobileImages: [
            'dashboard.png',
            'login.png',
            'leads.png',
            'quotesList.png',
            'floorOptions.png',
            'quote1.png',
            'quote2.png'
        ].map((u) => cdnImg(`salesApp/mobile/${u}`)),
        desktopImages: [
            'dashboard.png',
            'login.png',
            'leads.png',
            'quotesList.png',
            'floorOptions.png',
            'newQuote.png',
            'pricing.png',
            'quote1.png',
            'quote2.png'
        ].map((i) => cdnImg(`salesApp/desktop/${i}`)),
        tags: ['JavaScript', 'React', 'Redux', 'SCSS', 'MongoDB', 'Express', 'Heroku']
    },
    {
        title: 'Portfolio',
        gitHub: 'https://github.com/mafumeade/portfolio',
        url: 'https://MatthewMeade.ca',
        description: portfolioDescription.trim(),
        // coverImage: cdnImg('portfolio/portfolioCover.png'),
        coverImage:
            'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
        images: [
            'https://images.unsplash.com/photo-1480694313141-fce5e697ee25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
        ],
        tags: ['JavaScript', 'React', 'SCSS', 'Netlify', 'Markdown', 'JSON', 'PDF']
    },
    {
        title: 'Android Chat App',
        gitHub: 'https://github.com/mafumeade/AndroidChatApp',
        url: 'https://github.com/mafumeade/AndroidChatApp/releases/tag/1.0',
        urlText: 'Download',
        description: chatAppDescription.trim(),
        coverImage: cdnImg('chatApp/cover.jpg'),
        desktopImages: ['chat.jpg', 'login.jpg', 'contacts.jpg', 'search.jpg', 'delete.jpg'].map((i) =>
            cdnImg(`chatApp/desktop/${i}`)
        ),
        mobileImages: ['chat.jpg', 'login.jpg', 'contacts.jpg', 'search.jpg', 'delete.jpg'].map((i) =>
            cdnImg(`chatApp/mobile/${i}`)
        ),
        tags: ['JavaScript', 'React', 'Redux', 'Android', 'MongoDB', 'Express', 'Socket.io']
    },
    {
        title: 'Java Moose Game',
        gitHub: 'https://github.com/mafumeade/MooseGame',
        url: 'https://github.com/mafumeade/MooseGame/releases/tag/1',
        urlText: 'Download',
        description: mooseGameDescription.trim(),
        coverImage: cdnImg('mooseGame/title.png'),
        images: [
            'title.png',
            'gameplay1.png',
            'gameplay2.png',
            'gameOver.png',
            'controls.png',
            'storeMain.png',
            'storeItems.png',
            'storeCars.png',
            'settings.png',
            'gameplayVideo.mp4'
        ].map((i) => cdnImg(`mooseGame/${i}`)),
        tags: ['Java', 'Swing', 'Game', 'OOP', 'Moose']
    }
].map((e) => ({ ...e, key: e.title.split(' ').join('_') }));

export const coverLinks = [
    {
        icon: 'fas fa-star',
        text: 'Portfolio',
        href: '#portfolio',
        bioText: 'See My Portfolio',
        onClick: (e) => {
            // TODO: Refactor this to be able to scroll from anywhere. Hooks?
            e.preventDefault();
            const top = document.querySelector('.showcase .header').offsetTop - 50;
            window.scrollTo({ top, behavior: 'smooth' });
        },
        showInNav: false
    },
    {
        icon: 'fab fa-github',
        text: 'GitHub',
        href: 'https://github.com/mafumeade',
        bioText: 'View My GitHub'
    },
    {
        icon: 'fas fa-file-alt',
        text: 'Resume',
        href: 'https://MatthewMeade.ca/resume.pdf',
        bioText: 'Download My Resume'
    },
    {
        icon: 'fas fa-envelope',
        text: 'email@MatthewMeade.ca',
        shortText: 'Email Me',
        href: 'mailto:email@MatthewMeade.ca',
        bioText: 'Email Me: email@MatthewMeade.ca'
    }
];
