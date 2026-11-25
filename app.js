(() => {
  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', '打开导航');
    navigation.dataset.open = 'false';
  };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    navigation.dataset.open = String(open);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.header-inner')) closeMenu();
  });
  const wideScreen = window.matchMedia('(min-width: 801px)');
  wideScreen.addEventListener('change', closeMenu);

  document.querySelectorAll('.waveform, .large-waveform').forEach(wave => {
    const bars = wave.classList.contains('large-waveform') ? 37 : 31;
    for (let index = 0; index < bars; index++) {
      const bar = document.createElement('span');
      const envelope = Math.sin((index / (bars - 1)) * Math.PI);
      const variation = (Math.sin(index * 2.1) + Math.cos(index * 0.7) + 2) / 4;
      bar.style.height = `${8 + envelope * (22 + variation * 65)}%`;
      wave.append(bar);
    }
  });

  const demoText = document.querySelector('#demo-text');
  const demoSecondary = document.querySelector('#demo-secondary');
  const panels = {
    typing: document.querySelector('#keyboard-preview'),
    voice: document.querySelector('#voice-preview'),
    ai: document.querySelector('#ai-preview'),
  };
  const voiceSentence = '明天下午三点开项目会，记得带上电脑。';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let voiceTimer;
  let activeDemo = 'typing';
  const stopVoice = () => {
    window.clearInterval(voiceTimer);
    demoText.setAttribute('aria-busy', 'false');
  };
  const playVoice = () => {
    stopVoice();
    if (reducedMotion.matches) {
      demoText.textContent = voiceSentence;
      return;
    }
    let characters = 0;
    demoText.setAttribute('aria-busy', 'true');
    demoText.textContent = '';
    voiceTimer = window.setInterval(() => {
      characters += 1;
      demoText.textContent = voiceSentence.slice(0, characters);
      if (characters >= voiceSentence.length) stopVoice();
    }, 85);
  };
  const setDemo = mode => {
    stopVoice();
    activeDemo = mode;
    Object.entries(panels).forEach(([name, panel]) => { panel.hidden = name !== mode; });
    document.querySelectorAll('[data-demo]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.demo === mode));
    });
    if (mode === 'typing') {
      demoText.textContent = '周末一起出去走走吧';
      const caret = document.createElement('span');
      caret.className = 'caret';
      caret.setAttribute('aria-hidden', 'true');
      demoText.append(caret);
      demoSecondary.textContent = '想到的，顺手记下来。';
    } else if (mode === 'voice') {
      demoSecondary.textContent = '流式过程为预设文字示意。';
      playVoice();
    } else {
      demoText.textContent = '周五之前把方案给我';
      demoSecondary.textContent = '换一种语气，表达同一个意思。';
    }
  };
  document.querySelectorAll('[data-demo]').forEach(button => {
    button.addEventListener('click', () => setDemo(button.dataset.demo));
  });
  document.querySelector('#play-voice').addEventListener('click', playVoice);
  document.querySelectorAll('[data-tone]').forEach(button => {
    button.addEventListener('click', () => {
      const polite = button.dataset.tone === 'polite';
      document.querySelector('#rewritten-copy').textContent = polite
        ? '方便在周五前把方案发给我吗？'
        : '请在周五前发我方案。';
      document.querySelectorAll('[data-tone]').forEach(option => {
        option.setAttribute('aria-pressed', String(option === button));
      });
    });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopVoice();
      if (activeDemo === 'voice') demoText.textContent = voiceSentence;
    }
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches && activeDemo === 'voice') {
      stopVoice();
      demoText.textContent = voiceSentence;
    }
  });
})();
