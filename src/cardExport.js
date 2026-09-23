// Renders the story card to a 1080×1350 PNG (same layout as the on-page preview).
const W = 1080
const H = 1350
const PAD = 60

function wrapText(ctx, text, maxWidth) {
  const words = text.split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    const probe = line ? `${line} ${w}` : w
    if (ctx.measureText(probe).width > maxWidth && line) {
      lines.push(line)
      line = w
    } else {
      line = probe
    }
  }
  if (line) lines.push(line)
  return lines
}

export async function downloadCard({ headline, quote, city, name }) {
  await document.fonts.load("600 76px Alexandria")
  await document.fonts.load("600 40px Alexandria")
  await document.fonts.load("400 43px Alexandria")
  await document.fonts.load("500 26px 'IBM Plex Mono'")

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  // base
  ctx.fillStyle = '#0B3A28'
  ctx.fillRect(0, 0, W, H)

  // diamond grid
  ctx.strokeStyle = 'rgba(247,243,234,.10)'
  ctx.lineWidth = 1.5
  const step = 70
  for (let i = -H; i < W + H; i += step) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke()
    ctx.beginPath(); ctx.moveTo(i + H, 0); ctx.lineTo(i, H); ctx.stroke()
  }

  // radial glow top
  const grad = ctx.createRadialGradient(W * 0.2, 0, 0, W * 0.2, 0, H * 0.75)
  grad.addColorStop(0, 'rgba(30,122,82,.55)')
  grad.addColorStop(1, 'rgba(11,58,40,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)

  // top row: منّا wordmark right, mono tag left
  ctx.textBaseline = 'top'
  ctx.direction = 'rtl'
  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(247,243,234,.85)'
  ctx.font = '600 40px Alexandria'
  ctx.fillText('منّا', W - PAD, PAD)
  ctx.direction = 'ltr'
  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(247,243,234,.5)'
  ctx.font = "500 26px 'IBM Plex Mono'"
  ctx.fillText('MINNA · 96', PAD, PAD + 8)

  // headline (gold, RTL)
  ctx.direction = 'rtl'
  ctx.textAlign = 'right'
  ctx.fillStyle = '#D9B778'
  ctx.font = '600 76px Alexandria'
  const headlineLines = wrapText(ctx, headline, W - PAD * 2)
  let y = H * 0.34
  for (const line of headlineLines) {
    ctx.fillText(line, W - PAD, y)
    y += 76 * 1.4
  }

  // quote (RTL, wrapped)
  y += 20
  ctx.fillStyle = '#F7F3EA'
  ctx.font = '400 43px Alexandria'
  for (const line of wrapText(ctx, quote, W - PAD * 2)) {
    ctx.fillText(line, W - PAD, y)
    y += 43 * 1.8
  }

  // divider
  const footY = H - 200
  ctx.strokeStyle = 'rgba(247,243,234,.2)'
  ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(PAD, footY); ctx.lineTo(W - PAD, footY); ctx.stroke()

  // footer right: city + name (RTL)
  ctx.textAlign = 'right'
  ctx.fillStyle = '#F7F3EA'
  ctx.font = '500 43px Alexandria'
  ctx.fillText(city, W - PAD, footY + 40)
  ctx.fillStyle = 'rgba(247,243,234,.55)'
  ctx.font = '400 35px Alexandria'
  ctx.fillText(name, W - PAD, footY + 100)

  // footer left: identity phrase + national day (LTR block, gold)
  ctx.textAlign = 'left'
  ctx.fillStyle = '#D9B778'
  ctx.font = '500 38px Alexandria'
  ctx.direction = 'rtl'
  ctx.textAlign = 'right'
  const phraseWidth = ctx.measureText('عزّنا بطبعنا').width
  ctx.fillText('عزّنا بطبعنا', PAD + phraseWidth, footY + 44)
  ctx.direction = 'ltr'
  ctx.textAlign = 'left'
  ctx.fillStyle = 'rgba(247,243,234,.4)'
  ctx.font = "400 24px 'IBM Plex Mono'"
  ctx.fillText('NATIONAL DAY 96 · 2026', PAD, footY + 104)

  const a = document.createElement('a')
  a.download = 'minna-card.png'
  a.href = canvas.toDataURL('image/png')
  a.click()
}
