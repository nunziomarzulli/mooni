const DATA_URL = 'data/artists.json';

function q(k){return new URLSearchParams(location.search).get(k)}

async function getData(){
  const res = await fetch(DATA_URL, {cache:'no-store'});
  return await res.json();
}

export async function renderArtistList(){
  const {artists} = await getData();
  const list = document.getElementById('artist-list');
  artists.forEach(a => {
    const card = document.createElement('a');
    card.href = `artist.html?id=${encodeURIComponent(a.id)}`;
    card.className = 'card';

    const img = document.createElement('img');
    img.src = a.avatar || 'https://picsum.photos/seed/'+a.id+'/200';
    img.alt = a.name;
    img.className = 'avatar';

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<div class="name">${a.name}</div><div class="genre">${a.genre}</div>`;

    card.appendChild(img);
    card.appendChild(meta);
    list.appendChild(card);
  })
}

export async function renderArtistPage(){
  const {artists} = await getData();
  const id = q('id');
  const artist = artists.find(a => a.id === id) || artists[0];

  const profile = document.getElementById('artist-profile');
  profile.innerHTML = `
    <img class="avatar" src="${artist.avatar}" alt="${artist.name}">
    <div>
      <div class="name" style="font-size:22px">${artist.name}</div>
      <div class="genre">${artist.genre}</div>
      <div class="badge">Artista Mooni</div>
    </div>
  `;

  const wrap = document.getElementById('tracks');
  artist.tracks.forEach(t => {
    const box = document.createElement('section');
    box.className = 'track';
    box.innerHTML = `
      <h3>${t.title}</h3>
      <audio controls src="${t.preview}"></audio>
      <div class="row">
        <button class="btn" data-amt="0.20">€0,20</button>
        <button class="btn" data-amt="0.50">€0,50</button>
        <button class="btn ghost" data-amt="custom">Importo</button>
      </div>
      <p class="note">Dopo la donazione, riceverai il download del file completo.</p>
    `;
    wrap.appendChild(box);

    box.querySelectorAll('button').forEach(b=>{
      b.addEventListener('click', ()=> startCheckout({
        artistId: artist.id,
        trackId: t.id,
        amount: b.dataset.amt
      }));
    })
  })
}

window.renderArtistList = renderArtistList;
window.renderArtistPage = renderArtistPage;
