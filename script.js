document.addEventListener('DOMContentLoaded', () => {
    
    // --- PHASE 1: BALLOONS ---
    const balloonsContainer = document.getElementById('balloons-container');
    const colors = ['#f3c669', '#b3883a', '#9a6b22', '#ffeb99']; // Gold shades
    
    function createBalloons() {
        for (let i = 0; i < 20; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            // Random properties
            const left = Math.random() * 100;
            const delay = Math.random() * 5;
            const sizeMap = Math.random() * 0.5 + 0.8; // 0.8 to 1.3
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            balloon.style.left = `${left}%`;
            balloon.style.animationDelay = `${delay}s`;
            balloon.style.transform = `scale(${sizeMap})`;
            balloon.style.backgroundColor = color;
            
            balloonsContainer.appendChild(balloon);
        }
    }
    createBalloons();

    // --- TRANSITION P1 -> P2 ---
    const btnReceiveGift = document.getElementById('btn-receive-gift');
    const phase1 = document.getElementById('phase-1');
    const phase2 = document.getElementById('phase-2');

    btnReceiveGift.addEventListener('click', () => {
        phase1.classList.remove('active');
        phase1.classList.add('hidden');
        
        const bgMusic = document.getElementById('bg-music');
        const visualizer = document.getElementById('visualizer');
        const btnToggleMusic = document.getElementById('toggle-music');
        
        setTimeout(() => {
            phase2.classList.remove('hidden');
            phase2.classList.add('active');
            
            // Iniciar música
            if (bgMusic) {
                bgMusic.volume = 0.5;
                bgMusic.play().catch(e => console.log('Autoplay prevenido:', e));
            }
        }, 1500); // Wait for fade out
    });

    // Control de Pausa/Reproducir
    const btnToggleMusic = document.getElementById('toggle-music');
    const bgMusic = document.getElementById('bg-music');
    const visualizer = document.getElementById('visualizer');
    
    if (btnToggleMusic && bgMusic && visualizer) {
        btnToggleMusic.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                visualizer.classList.remove('paused');
                btnToggleMusic.textContent = "Pausar";
            } else {
                bgMusic.pause();
                visualizer.classList.add('paused');
                btnToggleMusic.textContent = "Reproducir";
            }
        });
    }

    // --- PHASE 2: 3D BOOK LOGIC ---
    const book = document.getElementById('book');
    const backCover = document.getElementById('back-cover-page');

    // ==========================================
    // 📖 TEXTOS DE LAS DEDICATORIAS 📖
    // ==========================================
    // Cambia el texto a la derecha de los dos puntos para editar la dedicatoria.
    const textosDedicatorias = {
        "IMG-20241005-WA0040.jpg": "Nuestra conexión fue inmediata, como si nuestras almas ya se conocieran de otra vida.",
        "IMG-20240913-WA0024.jpg": "Me enamoré de tu sonrisa antes de conocer quien eras realmente.",
        "IMG-20240913-WA0036.jpg": "Compartir mi vida contigo fue la aventura más maravillosa y enriquecedora que he vivido.",
        "IMG-20241005-WA0011.jpg": "Cada conversación inicial era un descubrimiento, un mundo nuevo que se abría ante mí.",
        "IMG-20241005-WA0025.jpg": "Gracias por aparecer en mi vida cuando menos lo esperaba y más lo necesitaba.",
        "IMG-20241005-WA0027.jpg": "Aún recuerdo la primera vez que te vi. En ese instante, supe que mi vida estaba a punto de cambiar para siempre.",
        "IMG-20240913-WA0021.jpg": "Nuestra historia comenzó con una mirada y se convirtió en la aventura más increíble de mi vida.",
        "IMG-20241005-WA0057.jpg": "Fuiste mi casualidad más bonita y mi destino más certero.",
        "IMG-20241005-WA0060.jpg": "Aquellos primeros días fueron pura magia, un sueño del que no quería despertar.",
        "IMG-20241005-WA0061.jpg": "Aunque nuestros caminos se separen, la esencia de lo que fuimos juntos siempre vivirá en mí.",
        "IMG-20241005-WA0066.jpg": "En tus ojos encontré un refugio que no sabía que necesitaba.",
        "IMG-20241016-WA0007.jpg": "Contigo, el tiempo se detenía y el resto del mundo desaparecía.",
        "IMG-20241018-WA0029.jpg": "Siempre atesoraré la inocencia y la emoción de nuestros primeros 'Te Lobo'.",
        "IMG-20241018-WA0041.jpg": "En cada atardecer que vimos juntos, sentía que el universo nos estaba regalando un momento perfecto.",
        "IMG-20241027-WA0033.jpg": "El viaje a La Guaira no fue solo a la playa, fue el viaje a un lugar donde solo existíamos tú y yo.",
        "IMG-20241027-WA0049.jpg": "En esa playa, entre el sonido de las olas y la inmensidad del mar, te pedí que fueras mi novia. Fue el 'Sí' más feliz de mi vida.",
        "IMG-20241027-WA0053.jpg": "Aún siento la brisa del mar y el calor de tu mano mientras caminábamos por la orilla.",
        "IMG-20241027-WA0066.jpg": "Siempre tendrás un lugar especial en mi corazón, un espacio reservado solo para ti y nuestros recuerdos.",
        "IMG-20241027-WA0067.jpg": "Viajar contigo era mi forma favorita de escapar de la realidad y construir nuestro propio mundo.",
        "IMG-20241027-WA0081.jpg": "Cada 'te amo' que te dije salió desde lo más profundo de mi ser, con una sinceridad inquebrantable.",
        "IMG-20241027-WA0099.jpg": "Las fotos de nuestros viajes son testigos de la felicidad genuina que compartimos.",
        "IMG-20241027-WA0110.jpg": "Gracias por cada aventura, por cada risa compartida en el camino y por cada recuerdo que grabamos en nuestros corazones.",
        "IMG-20241027-WA0129.jpg": "Sigue brillando, sigue sonriendo y sigue disfrutando de tu vida al máximo.",
        "IMG-20241027-WA0162.jpg": "Me dolió no poder darte todo el tiempo y la atención que merecías, aunque mi corazón siempre estuvo contigo.",
        "IMG-20250104-WA0000.jpg": "Fuiste mi refugio, mi cómplice y la inspiración detrás de mis mejores sonrisas. Gracias por todo.",
        "IMG-20250106-WA0015.jpg": "Me enseñaste a amar de una manera que no creía posible.",
        "IMG-20250106-WA0017.jpg": "La Colonia Tovar se sintió como un cuento de hadas, y tú eras mi princesa.",
        "IMG-20250106-WA0021.jpg": "Nuestros viajes fueron capítulos llenos de color y alegría en el libro de nuestra relación.",
        "IMG-20250106-WA0043.jpg": "Admiraba tu fuerza, tu inteligencia y la bondad de tu corazón.",
        "IMG-20250115-WA0043.jpg": "Cada risa compartida contigo se convirtió en la banda sonora de mis días más felices.",
        "IMG_20241123_212543_068.webp": "No solo amaba los grandes momentos, también adoraba la simpleza de estar a tu lado sin decir nada.",
        "IMG_20241123_212553_809.webp": "Entiendo que cada uno debe seguir su propio camino para encontrar su felicidad.",
        "IMG_20241123_215839_530.webp": "La distancia física que se interpuso entre nosotros nunca pudo borrar el amor que sentía.",
        "IMG_20241123_215958_425.webp": "Soñé contigo tantas veces, y cada sueño se sentía como una promesa de un futuro juntos.",
        "IMG_20241123_220021_686.webp": "Me quedo con la gratitud infinita de haber coincidido contigo y haber creado recuerdos inolvidables.",
        "IMG_20241123_220809_555@-1876374300.jpg": "Lamento profundamente que las circunstancias difíciles nos pusieran a prueba de esa manera.",
        "IMG_20241124_142205_918.webp": "Tus abrazos tenían el poder de calmar cualquier tormenta en mi vida.",
        "Snapchat-1080837627.jpg": "Cada rincón que exploramos juntos en la Colonia Tovar ahora tiene un pedacito de nuestra historia.",
        "Snapchat-1145174178_20250919_151445.mp4": "Me hiciste querer ser una mejor persona cada día.",
        "Snapchat-1196083695.jpg": "Gracias por dejarme entrar en tu mundo y por ser parte del mío.",
        "Snapchat-1196424944.jpg": "Fuiste mi confidente, mi apoyo y mi mejor amiga.",
        "Snapchat-1467346459.jpg": "No importa dónde estuviéramos, si estaba contigo, estaba en casa.",
        "Snapchat-1562903082.jpg": "Atesoraré cada pequeño detalle de nuestra historia, desde nuestros desayunos hasta nuestras conversaciones nocturnas.",
        "Snapchat-1628620430.jpg": "Aunque las cosas no terminaron como soñába, siempre estaré agradecido por el tiempo que compartimos.",
        "Snapchat-1713647207.jpg": "Atesoro cada instante a tu lado como el regalo más valioso que la vida me ha dado.",
        "Snapchat-1955369277.jpg": "Acepto con dolor que a veces el amor no es suficiente para superar todos los obstáculos.",
        "Snapchat-209631403.jpg": "Nuestros momentos juntos fueron destellos de pura magia que iluminaron mi existencia.",
        "Snapchat-244948194.jpg": "Gracias por enseñarme la belleza de amar y ser amado con tanta intensidad.",
        "Snapchat-403061155.jpg": "En cada rincón de mis recuerdos, encuentro la huella de tu dulzura y la calidez de tu amor.",
        "Snapchat-457807757.jpg": "Tu felicidad era la mía, y lo disfutaba al 100",
        "Snapchat-502364826.jpg": "Nuestra historia fue un poema escrito con miradas complicas y gestos de cariño sincero.",
        "Snapchat-593131332.jpg": "En los momentos más difíciles, tu presencia era la luz que me guiaba.",
        "Snapchat-834640535.jpg": "Gracias por cada página de nuestra historia, incluso por las que dolieron escribir.",
        "Snapchat-981310936.jpg": "Dedicatoria para la foto 54..."
    };

    const mediaFiles = [
        "IMG-20241005-WA0040.jpg", "IMG-20240913-WA0024.jpg", "IMG-20240913-WA0036.jpg", "IMG-20241005-WA0011.jpg",
        "IMG-20241005-WA0025.jpg", "IMG-20241005-WA0027.jpg", "IMG-20240913-WA0021.jpg", "IMG-20241005-WA0057.jpg", 
        "IMG-20241005-WA0060.jpg", "IMG-20241005-WA0061.jpg", "IMG-20241005-WA0066.jpg", "IMG-20241016-WA0007.jpg", 
        "IMG-20241018-WA0029.jpg", "IMG-20241018-WA0041.jpg", "IMG-20241027-WA0033.jpg", "IMG-20241027-WA0049.jpg", 
        "IMG-20241027-WA0053.jpg", "IMG-20241027-WA0066.jpg", "IMG-20241027-WA0067.jpg", "IMG-20241027-WA0081.jpg", 
        "IMG-20241027-WA0099.jpg", "IMG-20241027-WA0110.jpg", "IMG-20241027-WA0129.jpg", "IMG-20241027-WA0162.jpg", 
        "IMG-20250104-WA0000.jpg", "IMG-20250106-WA0015.jpg", "IMG-20250106-WA0017.jpg", "IMG-20250106-WA0021.jpg", 
        "IMG-20250106-WA0043.jpg", "IMG-20250115-WA0043.jpg", "IMG_20241123_212543_068.webp", "IMG_20241123_212553_809.webp", 
        "IMG_20241123_215839_530.webp", "IMG_20241123_215958_425.webp", "IMG_20241123_220021_686.webp", "IMG_20241123_220809_555@-1876374300.jpg", 
        "IMG_20241124_142205_918.webp", "Snapchat-1080837627.jpg", "Snapchat-1145174178_20250919_151445.mp4", 
        "Snapchat-1196083695.jpg", "Snapchat-1196424944.jpg", "Snapchat-1467346459.jpg", "Snapchat-1562903082.jpg", 
        "Snapchat-1628620430.jpg", "Snapchat-1713647207.jpg", "Snapchat-1955369277.jpg", "Snapchat-209631403.jpg", 
        "Snapchat-244948194.jpg", "Snapchat-403061155.jpg", "Snapchat-457807757.jpg", "Snapchat-502364826.jpg", 
        "Snapchat-593131332.jpg", "Snapchat-834640535.jpg", 
        "Snapchat-981310936.jpg", "SPECIAL_FINAL_PAGE"
    ];

    // Cargar hojas dinámicamente
    mediaFiles.forEach((file, idx) => {
        let mediaContent = '';
        let dedicationText = textosDedicatorias[file] || `[Dedicatoria para la imagen/video #${idx + 1}...]`;
        
        if (file === "SPECIAL_FINAL_PAGE") {
            mediaContent = `<h3 style="font-family: var(--font-heading); font-size: 2.5rem; color: #333; text-align: center; line-height: 1.5;">Te Lobo Mucho Muchisimooo!!<br><br>🐺🤍</h3>`;
            dedicationText = "Fin de este hermoso recorrido...";
        } else {
            const isVideo = file.toLowerCase().endsWith('.mp4');
            if (isVideo) {
                mediaContent = `<div class="photo-placeholder"><video src="img/${file}" autoplay muted loop playsinline></video></div>`;
            } else {
                // Se usa tag <img> en lugar de background para mejor soporte y redimensionamiento
                mediaContent = `<div class="photo-placeholder"><img src="img/${file}" alt="Recuerdo ${idx + 1}" onerror="this.style.display='none'; this.parentElement.innerHTML='<span style=\\'color:#333;font-size:0.9rem;text-align:center\\'>Error al cargar imagen<br>(${file})</span>'"></div>`;
            }
        }

        let backContent = `
                <div class="page-content text-page">
                    <p class="dedication">${dedicationText}</p>
                </div>
        `;
        
        if (file === "Snapchat-981310936.jpg") {
            backContent = `
                <div class="page-content photo-page">
                    <div class="photo-placeholder"><video src="img/VID-20250115-WA0039.mp4" autoplay muted loop playsinline></video></div>
                </div>
            `;
        }

        const pageDiv = document.createElement('div');
        pageDiv.classList.add('page');
        pageDiv.innerHTML = `
            <div class="front">
                <div class="page-content photo-page">
                    ${mediaContent}
                </div>
            </div>
            <div class="back">
                ${backContent}
            </div>
        `;
        
        // Insertamos cada hoja nueva antes de la contraportada
        book.insertBefore(pageDiv, backCover);
    });

    const pages = document.querySelectorAll('.page');
    let currentPage = 0; // 0 means cover
    
    // UI Controls
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');

    function updateZIndexAndTransform() {
        pages.forEach((page, index) => {
            // If the page is flipped (on the left side)
            if (index < currentPage) {
                page.classList.add('flipped');
                // Adjust z-index to stack correctly on the left
                page.style.zIndex = index + 1;
            } else {
                // Not flipped (on the right side)
                page.classList.remove('flipped');
                // Adjust z-index to stack correctly on the right
                page.style.zIndex = pages.length - index;
            }
        });

        // If cover is opened, shift book horizontally for centering
        if (currentPage > 0 && currentPage < pages.length) {
            book.classList.add('open');
        } else {
            book.classList.remove('open');
        }

        // TRIGGER PHASE 3 if we closed the back cover
        if (currentPage === pages.length) {
            triggerPhase3();
        }
    }

    function nextPage() {
        if (currentPage < pages.length) {
            currentPage++;
            updateZIndexAndTransform();
        }
    }

    function prevPage() {
        if (currentPage > 0) {
            currentPage--;
            updateZIndexAndTransform();
        }
    }

    // Bind Buttons
    if(nextBtn) nextBtn.addEventListener('click', nextPage);
    if(prevBtn) prevBtn.addEventListener('click', prevPage);

    // Bind Book Clicks
    pages.forEach((page, index) => {
        page.addEventListener('click', (e) => {
            // Determine if clicking Left side or Right side relative to viewport
            const rect = page.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            
            // Si la página está doblada, al hacerle clic vuelve a la derecha
            if (page.classList.contains('flipped')) {
                // Retrocede todas las páginas desde currentPage hasta este index
                currentPage = index;
                updateZIndexAndTransform();
            } else {
                // Si la página no está doblada, al darle clic se dobla a la izq
                // Avanza todas las páginas hasta este index + 1
                currentPage = index + 1;
                updateZIndexAndTransform();
            }
        });
    });

    // Swipe gestures for Mobile
    let startX = 0;
    let endX = 0;

    book.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
    });

    book.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const diff = endX - startX;
        const threshold = 50; 
        if (diff > threshold) {
            // Swiped Right -> Go Back Page
            prevPage();
        } else if (diff < -threshold) {
             // Swiped Left -> Go Next Page
            nextPage();
        }
    }

    // Initialize book
    updateZIndexAndTransform();

    // --- PHASE 3: FINAL EMOTIONAL CLOSE ---
    const phase3 = document.getElementById('phase-3');
    let phase3Triggered = false;

    function triggerPhase3() {
        if (phase3Triggered) return;
        phase3Triggered = true;

        phase2.classList.remove('active');
        phase2.classList.add('hidden');
        
        // Detener la música
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            bgMusic.pause();
        }

        setTimeout(() => {
            phase3.classList.remove('hidden');
            phase3.classList.add('active');
            startFireworks();
        }, 1500);
    }

    // --- FIREWORKS LOGIC (Canvas) ---
    function startFireworks() {
        const canvas = document.getElementById('fireworks-canvas');
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        
        canvas.width = width;
        canvas.height = height;

        window.addEventListener('resize', () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        });

        const particles = [];
        
        class Particle {
            constructor(x, y, color) {
                this.x = x;
                this.y = y;
                this.color = color;
                // Random velocity
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * 5 + 2;
                this.vx = Math.cos(angle) * speed;
                this.vy = Math.sin(angle) * speed;
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.015;
            }
            update() {
                this.vx *= 0.99; // friction
                this.vy += 0.05; // gravity
                this.x += this.vx;
                this.y += this.vy;
                this.alpha -= this.decay;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            }
        }

        const fwColors = ['#f3c669', '#ffeb99', '#ffffff', '#e3a83b', '#ff7b54'];

        function createExplosion(x, y) {
            for (let i = 0; i < 50; i++) {
                const color = fwColors[Math.floor(Math.random() * fwColors.length)];
                particles.push(new Particle(x, y, color));
            }
        }

        function loop() {
            // Clear with slight trailing effect for fireworks trails
            ctx.fillStyle = 'rgba(5, 1, 10, 0.2)'; 
            ctx.fillRect(0, 0, width, height);
            
            // Randomly create explosions
            if (Math.random() < 0.05) {
                const x = Math.random() * width;
                const y = Math.random() * (height / 2); // Explode in top half
                createExplosion(x, y);
            }

            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.update();
                p.draw();
                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(loop);
        }
        
        loop();
    }
});
