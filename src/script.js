document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const content = document.getElementById('content');
    const lyricsContainer = document.getElementById('lyrics-container');
    const fadeImages = document.querySelectorAll('.fade-image');
    const audio = document.getElementById('audio');
    const sakura = document.querySelector('.sakura');
    const scrambleContainer = document.querySelector('.scramble-container');
    let lyricsInterval;

    // Scramble effect
    const test = document.querySelector('.test');
    const txt = 'Cai Lin_';
    const speed = 10;
    const shuffleCount = 6;
    const random = "*&%!1234567ABC";
    const LIMIT = txt.length;

    let i = 0;
    let shuffle = 0; 
    let mojicount = 0;

    setInterval(triggerScramble, 2000);

    function scramble() {
        const PROGRESS = test.textContent.length;
        if (PROGRESS < LIMIT) {  
            if (shuffle < shuffleCount) {
                const mix = Math.floor(Math.random() * (random.length));
                const output = txt.slice(0, mojicount);
                test.innerText = output + random[mix];
                shuffle++;
                setTimeout(scramble, speed);
            } else { 
                mojicount++;
                shuffle = 0;
                scramble();
            }   
        } else if (PROGRESS >= LIMIT) {
            test.innerText = txt;
        }
    }

    function triggerScramble() {
        shuffle = 0;
        mojicount = 0;
        test.innerText = "";
        scramble();
    }

    startButton.addEventListener('click', () => {
        // Sembunyikan scramble text dan tombol
        scrambleContainer.style.display = 'none';
        
        // Tampilkan bagian lirik, gambar, dan sakura
        content.classList.remove('hidden');
        sakura.classList.remove('hidden');
        
        // Mulai audio
        audio.play();
        
        // Sinkronisasi lirik dan gambar
        syncLyrics();
    });

    function syncLyrics() {
        const lyricsTiming = [
            { start: 5, duration: 4, text: "Bila musim Berarti", imgIndex: 0 },
            { start: 9, duration: 5, text: "Sampai waktu terhenti", imgIndex: 1 },
            { start: 14, duration: 4, text: "Walau dunia membenci", imgIndex: 2 },
            { start: 18, duration: 5, text: "Ku kan tetap disini", imgIndex: 3 },
            { start: 23, duration: 3, text: "Bila habis sudah", imgIndex: 4 },
            { start: 26, duration: 2, text: "Waktu Ini", imgIndex: 5 },
            { start: 28, duration: 3, text: "Tak lagi berpijak", imgIndex: 6 },
            { start: 31, duration: 1, text: "Pada dunia", imgIndex: 7 },
            { start: 32, duration: 3, text: "Telah aku habiskan", imgIndex: 8 },
            { start: 35, duration: 6, text: "Sisa hidupku hanya untukmu", imgIndex: 9 },
            { start: 41, duration: 3, text: "Bila habis sudah", imgIndex: 10 },
            { start: 44, duration: 2, text: "Cinta ini", imgIndex: 11 },
            { start: 46, duration: 2, text: "Tak lagi tersisa", imgIndex: 12 },
            { start: 48, duration: 2, text: "Untuk dunia", imgIndex: 13 },
            { start: 50, duration: 3, text: "Karena tlah kuhabiskan", imgIndex: 14 },
            { start: 53, duration: 7, text: "Sisa Cintaku hanya untukmu", imgIndex: 15 },
            { start: 60, duration: 2, text: "Karena tlah ku habiskan", imgIndex: 16 },
            { start: 62, duration: 5, text: "Sisa cintaku hanya untukmu", imgIndex: 17 }
        ];

        lyricsInterval = setInterval(() => {
            const currentTime = audio.currentTime;
            const currentLyric = lyricsTiming.find(lyric => currentTime >= lyric.start && currentTime < (lyric.start + lyric.duration));
            
            if (currentLyric) {
                lyricsContainer.textContent = currentLyric.text;
                
                // Update image visibility with fade effect
                fadeImages.forEach((img, index) => {
                    if (index === currentLyric.imgIndex) {
                        img.style.opacity = 1;
                    } else {
                        img.style.opacity = 0;
                    }
                });
            } else {
                lyricsContainer.textContent = ''; // Clear lyrics if no match
            }
        }, 100); // Update lyrics every 100 ms
    }
});
