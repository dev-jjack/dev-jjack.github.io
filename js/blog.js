const posts = [
            {
                title: "Creazione del mio sito",
                date: "2026-05-20",
                excerpt: "Ho sempre amato creare cose e mostrarle. Questo sito è il primo dove posso mostrare chi sono e cosa faccio, fuori dai social e nel mio spazio dove ho il controllo.",
                cover: { src:"../img/img_me.jpeg" },
                photos: ["../img/img_me.jpeg"]
            },
            {
                title: "Studio del Tedesco A1",
                date: "2026-03-20",
                excerpt: "Ho iniziato a studiare il tedesco perchè voglio fare una stagione in Trentino nei prossimi anni, inoltre penso che sapere più lingue ti crei un vantaggio rispetto ad un altro, obbiettivo sarebbe l'A1",
                cover: { src: "../img/germania.jpg" },
                photos: ["../img/germania.jpg"]
            },
            {
                title:"Il mio primo sito per una azienda",
                date:"2026-07-30",
                excerpt:"Ho creato il mio primo sito per una azienda, un sito multipagina con form,map,carrosello foto e una grafica accattivante",
                cover: {src:"../img/foto-sito-rid.png"},
                photos: ["../img/foto-sito-rid.png"]
            },
        ];
        const grid = document.getElementById('blog-grid');

        posts.forEach((post, i) => {
            const card = document.createElement('div');
            card.className = 'post-card';

            const coverHTML = post.cover.src
                ? `<img src="${post.cover.src}" alt="${post.title}">`
                : `<div class="post-card-nophoto">${post.cover.emoji || '📝'}</div>`;

            card.innerHTML = `
                ${coverHTML}
                <div class="post-overlay">
                    <h3>${post.title}</h3>
                    <time>${formatDate(post.date)}</time>
                </div>
            `;

            card.addEventListener('click', () => openModal(i));
            grid.appendChild(card);
        });
        let currentPhotos = [];
        let currentPhotoIndex = 0;

        function openModal(i) {
            const post = posts[i];
            document.getElementById('modal-title').textContent = post.title;
            document.getElementById('modal-date').textContent = formatDate(post.date);
            document.getElementById('modal-text').textContent = post.excerpt;

            const carousel = document.getElementById('modal-carousel');
            carousel.querySelectorAll('img, .no-photo').forEach(el => el.remove());

            currentPhotos = post.photos && post.photos.length > 0 ? post.photos : [];
            currentPhotoIndex = 0;

            if (currentPhotos.length === 0) {
                const placeholder = document.createElement('div');
                placeholder.className = 'no-photo';
                placeholder.textContent = post.cover.emoji || '📝';
                carousel.insertBefore(placeholder, carousel.querySelector('#btn-prev'));
            } else {
                currentPhotos.forEach((src, idx) => {
                    const img = document.createElement('img');
                    img.src = src;
                    img.alt = post.title;
                    if (idx === 0) img.classList.add('active');
                    carousel.insertBefore(img, carousel.querySelector('#btn-prev'));
                });
            }

            renderDots();
            updateCarousel();

            document.getElementById('modal-overlay').classList.add('open');
        }

        function renderDots() {
            const dotsEl = document.getElementById('modal-dots');
            dotsEl.innerHTML = '';
            currentPhotos.forEach((_, i) => {
                const dot = document.createElement('div');
                dot.className = 'dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', () => { currentPhotoIndex = i; updateCarousel(); });
                dotsEl.appendChild(dot);
            });
        }

        function updateCarousel() {
            const imgs = document.querySelectorAll('#modal-carousel img');
            imgs.forEach((img, i) => img.classList.toggle('active', i === currentPhotoIndex));
            document.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === currentPhotoIndex));

            const hasPrev = currentPhotoIndex > 0;
            const hasNext = currentPhotoIndex < currentPhotos.length - 1;
            document.getElementById('btn-prev').style.display = hasPrev ? 'flex' : 'none';
            document.getElementById('btn-next').style.display = hasNext ? 'flex' : 'none';
        }

        document.getElementById('btn-prev').addEventListener('click', () => {
            if (currentPhotoIndex > 0) { currentPhotoIndex--; updateCarousel(); }
        });

        document.getElementById('btn-next').addEventListener('click', () => {
            if (currentPhotoIndex < currentPhotos.length - 1) { currentPhotoIndex++; updateCarousel(); }
        });

        document.getElementById('modal-close').addEventListener('click', closeModal);
        document.getElementById('modal-overlay').addEventListener('click', e => {
            if (e.target === document.getElementById('modal-overlay')) closeModal();
        });

        function closeModal() {
            document.getElementById('modal-overlay').classList.remove('open');
        }

        function formatDate(str) {
            const d = new Date(str);
            return d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
        }