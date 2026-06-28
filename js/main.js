(function () {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.menu-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  const widget = document.getElementById('chat-widget');
  const launcher = document.getElementById('chat-launcher');
  const closeBtn = document.getElementById('chat-close');
  const demoBtn = document.getElementById('demo-btn');
  const chatBody = document.getElementById('chat-body');
  const chatForm = document.getElementById('chat-form');

  if (!widget || !launcher) return;

  const chatInput = chatForm.querySelector('input');

  const replies = {
    price: 'Our Pro plan is $79/mo and includes 5 chatbots plus 25,000 messages. Starter is $29/mo. All plans include a 14-day free trial!',
    pricing: 'Our Pro plan is $79/mo and includes 5 chatbots plus 25,000 messages. Starter is $29/mo. All plans include a 14-day free trial!',
    trial: 'You can start a free 14-day trial — no credit card required. Just pick a plan and embed the widget on your site.',
    setup: 'Most teams go live in under 15 minutes: upload your docs, customize the bot, then paste one line of embed code.',
    integrate: 'FlowBot works on any website, plus Slack and our REST API. Pro and Enterprise plans include full API access.',
    slack: 'Slack integration is included on Pro and Enterprise plans. Connect in one click from your dashboard.',
    hello: 'Hey there! I can help with pricing, setup, integrations, or features. What would you like to know?',
    hi: 'Hey there! I can help with pricing, setup, integrations, or features. What would you like to know?',
    feature: 'FlowBot trains on your docs, deploys anywhere, and gives you conversion analytics — all in one platform.',
    help: "I'm a demo bot! Try asking about pricing, setup time, Slack integration, or free trial.",
    default: 'Great question! FlowBot handles support, sales, and onboarding 24/7. Want to know about pricing or how fast setup is?'
  };

  function openChat() {
    widget.classList.add('open');
    launcher.classList.add('hidden');
    chatInput.focus();
  }

  function closeChat() {
    widget.classList.remove('open');
    launcher.classList.remove('hidden');
  }

  function addMessage(text, type) {
    const el = document.createElement('div');
    el.className = 'msg ' + type;
    el.textContent = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getReply(text) {
    const lower = text.toLowerCase();
    for (const [key, reply] of Object.entries(replies)) {
      if (lower.includes(key)) return reply;
    }
    return replies.default;
  }

  launcher.addEventListener('click', openChat);
  closeBtn.addEventListener('click', closeChat);
  if (demoBtn) demoBtn.addEventListener('click', openChat);

  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    chatInput.value = '';
    setTimeout(function () { addMessage(getReply(text), 'bot'); }, 600);
  });

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Thanks! We\'ll be in touch within 24 hours.');
      contactForm.reset();
    });
  }
})();
