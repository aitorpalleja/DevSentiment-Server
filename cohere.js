const cohere = require('cohere-ai'); // This is your trial API key
cohere.init('74vRrIR19sYnuDw3XnJY1LcFAarw6LCaO3PscInD');
(async () => {
  const response = await cohere.classify({
    model: 'large',
    inputs: ["I hate javascript"],
    examples: [{"text": "#Homework due\n#Biology\n#Microbiology\n#Immunology\n#Hematology\n#Physiology\n#Literature\n#essay pay\n#Maths\n#finals\n#Chemistry\n#History\n#Economics\n#javascript\nDm us @supertutors50", "label": "Spam"}, {"text": "📢 Stakefish is hiring a Front-end software engineer!\n\n🌎 Remote GB\n\nApply → https://jobboardsearch.com/redirect?utm_source=twitter&utm_medium=bot&utm_id=jobboarsearch&utm_term=zobjobs.com&rurl=aHR0cHM6Ly96b2Jqb2JzLmNvbS9qb2IvZnJvbnRlbmQtc29mdHdhcmUtZW5naW5lZXItam9iLWluLXVrLXpqNmg5ampudWxwNy8/cmVmPWpvYmJvYXJkc2VhcmNo\n\n#jobalert #jobsearch #JobSeekers #javascript #reactjs #frontend #typescript\n", "label": "Job Offer"}, {"text": "Day 23 of learning Javascript\n\n- learning XMLHttp request and knowing the basics of API using JSON package\n", "label": "positive"}, {"text": "😍 I am so happy, that I have 🎯completed my #100DaysOfCode #challenge.\nI learn lots of things during this challenge.\ncheck out my developments here.\n👇\nhttps://vansh1190.github.io/My-Journey-with-web/\n\nThank you everyone for your support ♥.\nKeep supporting and helpng🤝 each other.\n#html5 #javascript", "label": "positive"}, {"text": "RIP javascript, time to learn rust", "label": "negative"}, {"text": "We score excellent grades in..\n✓Assignments\n✓Coursework\n✓spring classes\n✓Essay due\n✓Maths\n✓Dissertation\n✓programming\n✓Coding,C++\n✓Pay Paper\n✓Homework help\n✓Online Class\n✓Assignment due\n✓Javascript\n✓Accounting\n✓Finance\n✓Philosophy\nEmail assignimentwriter@gmail.com", "label": "Spam"}, {"text": "In #JavaScript to get or show information you can use:\n\nwindow.confirm() // a window with a message with 2 options [OK/Cancel]\n\nconsole.log() // show a message previously configured\n\nwindow.prompt() // a window where you can type inside and get its value.\n\n#Programming", "label": "positive"}, {"text": "Looking for someone to handle your;:\n#Essaydue\n#Paywrite\n#javascript\n#Philosophy\n#Chemistry\n#Literature\n#Calculus 1,2\n#Biology\n#Python\n#Nursing\n#psychology\n#Essayhelp\n#Essay\n#Essaypay\n#Pay assignment", "label": "Spam"}, {"text": "🌅 Okta is hiring Staff Quality Engineer\n\n🌇 Spain\n💪 #javascript #r #node #nodejs #typescript\n\n#tech #softwareengineer #jobs", "label": "Job Offer"}, {"text": "i hate javascript", "label": "negative"}]
  });
  console.log(`The confidence levels of the labels are ${JSON.stringify(response.body.classifications)}`);
})();