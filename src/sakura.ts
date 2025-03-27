export function setupSakura() {
  const canvas = document.querySelector('canvas');
  if (canvas === null) {
    return;
  }

  const ctx = canvas.getContext('2d');
  if (ctx === null) {
    return;
  }

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  let width = canvas.width;
  let height = canvas.height;
  let leaf = document.querySelector('#leaf');
  let leafs: Record<string, number>[] = [];
  let count = 100;

  for (let i = 0; i < count; i++) {  
    let angle = 10 + Math.random() * 30
    let dir = [-1,1][Math.floor(Math.random() * 2)];
    
    leafs.push({
      x: Math.random() * width,
      y: Math.random() * height,
      w: 30,
      h: 30 * (leaf!.getBoundingClientRect().height / leaf!.getBoundingClientRect().width),
      v: 20 / angle,
      a: angle,
      d: dir
    });
  }

  function update() {
    for (let i = 0; i < leafs.length; i++) {
      leafs[i].y += leafs[i].v;
      
      if (leafs[i].y > height) {
        leafs[i].y = -120;
        leafs[i].x = Math.random() * width;
      }
    }
  }

  function draw(dt?: any) {
    if (ctx === null) {
      return;
    }

    if (leaf === null) {
      return;
    }
    
    requestAnimationFrame(draw);
    update();
    
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < leafs.length; i++) {
      ctx.save();

      ctx.translate(leafs[i].x, leafs[i].y);

      ctx.rotate(leafs[i].d * Math.sin(dt * 0.002 * i * 0.01) * leafs[i].a * Math.PI / 180);  
      
      ctx.globalAlpha = Math.max(0, leafs[i].y * 0.1);
      // @ts-ignore
      ctx.drawImage(leaf, -leafs[i].w / 2, 0, leafs[i].w, leafs[i].h);
      
      ctx.restore();
    }
  }

  draw();
}
