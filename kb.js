/* base de connaissances */
const KB = {
  URGENCE: {
    keywords: ['finir ma vie','en finir','me suicid','me tuer','mourir','plus envie de vivre','me blesser','me faire du mal','veux mourir','veut mourir','veux en finir','auto-sabotage','blesser quelqu\'un','kill myself','suicide','end my life','want to die','hurt myself','self harm'],
    responses: [
      {
        main: "Ta vie est précieuse et tu n'as pas à traverser ce moment seul(e). Je suis sérieusement concerné(e) pour toi. 💙\n\nAide immédiate — Appelle MAINTENANT :",
        support: "🇹🇳 TUNISIE\nSAMU: 190\nPolice: 197\nUrgences: 1515"
      }
    ]
  },
  TRISTESSE: {
    keywords: ['triste','tristesse','pleure','pleuré','déprimé','déprime','mélancolie','chagrin','peine','cafard','malheureux','pleurer','pas bien','mal','vide','vidé','pleurnicheur','malade','souffre','souffrir','brisé','coeur brisé','décou'],
    responses: [
      {
        main: "La tristesse que tu ressens est valide et mérite toute ton attention. C'est courageux de te sentir et d'en parler. 💙",
        support: "Sache que tu n'es pas seul(e) dans cette douleur. Si cette tristesse persiste, parler à un professionnel peut vraiment te libérer."
      },
      {
        main: "Tes larmes sont un acte de courage, pas de faiblesse. Chaque émotion difficile nous apprend quelque chose. 💙",
        support: "Prends soin de toi doux : reste hydraté(e), cherche le calme, entoure-toi si possible. N'hésite pas à atteindre quelqu'un."
      },
      {
        main: "Je vois ta douleur et elle est digne d'être entendue. La tristesse fait partie de la vie — et tu es assez fort(e) pour la traverser. 💙",
        support: "Un professionnel de santé mentale peut vraiment faire la différence. C'est un acte d'amour envers toi-même."
      },
      {
        main: "Merci de me faire confiance avec ça. La tristesse est une émotion très humaine — pas quelque chose à combattre seul(e). 💙",
        support: "As-tu une personne de confiance à qui tu pourrais parler ? Parfois, juste être entendu(e) peut déjà aider."
      }
    ]
  },
  STRESS: {
    keywords: ['stressé','stress','anxieux','anxiété','débordé','submergé','pression','surchargé','nerv','tendu','inquiet','inquiète','angoiss','overwhelm','pas dormir','insomnies','paniq','préoccup','tendue'],
    responses: [
      {
        main: "Le stress que tu portes en ce moment est très réel, et c'est courageux de le reconnaître. 😌",
        support: "Essaie ça : inspire lentement par le nez pendant 4 secondes, puis expire par la bouche pendant 6 secondes. Répète 5 fois. Si le stress persiste, un professionnel peut t'aider."
      },
      {
        main: "Vous portez beaucoup — c'est normal de ressentir cette pression. Mais tu n'as pas à tout gérer d'un coup. 💚",
        support: "Focus sur une seule tâche à la fois. Demander de l'aide n'est pas une faiblesse — c'est une force. Qui pourrais-tu contacter ?"
      },
      {
        main: "L'anxiété peut sembler envahissante, mais rappelle-toi : tu as DÉJÀ surmonté des moments difficiles. Tu es plus résilient(e) que tu ne le crois. 💚",
        support: "Si ça affecte ton sommeil ou ton quotidien, un professionnel de santé mentale peut vraiment t'accompagner avec des outils efficaces."
      },
      {
        main: "Ton corps te dit qu'il a besoin d'une pause. Écoute-le. 💚",
        support: "Une courte promenade, un verre d'eau, quelques minutes de silence — ces petits gestes comptent vraiment."
      }
    ]
  },
  JOIE: {
    keywords: ['heureux','heureuse','joie','content','contente','super','génial','formidable','excellent','top','bonheur','sourire','épanoui','bien','fantastique','incroyable','ravi','ravi','amour','aime','adore'],
    responses: [
      {
        main: "Entendre que tu vas bien me fait vraiment chaud au cœur ! 😊✨",
        support: "Savoure ce moment précieux — la joie mérite d'être célébrée et chérie. Qu'est-ce qui t'apporte cette belle énergie ?"
      },
      {
        main: "C'est merveilleux ! 😊 Ces moments de bonheur sont les perles de notre vie.",
        support: "Continue à cultiver cette énergie positive. Partage ta joie avec quelqu'un — c'est contagieux ! 🌟"
      },
      {
        main: "Ton énergie positive brille vraiment ! C'est inspirant. 😊🌟",
        support: "Profite de cet élan pour avancer sur ce qui te tient à cœur — la momentum est ton allié !"
      },
      {
        main: "C'est beau de te voir heureux/se ! Merci de partager ça avec moi. 😊💚",
        support: "Garde cette lueur vivante en toi. Tu mérites tout ce bonheur et bien plus encore."
      }
    ]
  },
  PEUR: {
    keywords: ['peur','panique','paniq','effray','terrifié','angoisse','phob','cauchemar','appréhension','craint','redoute','flippe','terrifiant','horrible','prise de panique'],
    responses: [
      {
        main: "La peur que tu ressens est un signal que quelque chose compte vraiment pour toi. C'est une émotion profondément humaine. 💙",
        support: "Respire lentement et concentre-toi sur ce que tu PEUX contrôler ici et maintenant. Ancre-toi dans le présent."
      },
      {
        main: "C'est normal d'avoir peur — et tu es infiniment plus fort(e) que cette peur ne l'est. 💙",
        support: "Si cette peur envahit ton quotidien ou paralyse tes actions, un professionnel peut t'aider à la réapprivoiser."
      },
      {
        main: "Traverser la peur demande du vrai courage — et tu le montres en ce moment même. 💙",
        support: "Tu n'es pas seul(e). Parler à quelqu'un de confiance ou un thérapeute peut vraiment allléger ce fardeau."
      },
      {
        main: "Les pensées peur peuvent être overwhelming, mais ce ne sont que des pensées — pas la réalité. 💙",
        support: "Essaie de questionner gentiment : 'Qu'est-ce que je sais VRAIMENT être vrai maintenant ?' Ça peut aider."
      }
    ]
  },
  COLERE: {
    keywords: ['colère','énervé','énervée','furieux','furie','rage','agacé','irrité','frustré','frustration','exaspéré','fâché','hors de moi','fou','folle','rage de','degoût'],
    responses: [
      {
        main: "La colère que tu ressens est une émotion légitime — elle te dit quelque chose d'important. 💨",
        support: "Essaie cette pause : respire profondément, une courte marche, de l'eau froide sur ton visage. Puis reviens au moment."
      },
      {
        main: "Il est totalement normal de ressentir de la colère. Souvent, derrière la colère se cachent de la déception, de la douleur ou de l'injustice. 💨",
        support: "Peux-tu identifier ce qui se cache vraiment ? Ça peut t'aider à comprendre ce dont tu as VRAIMENT besoin."
      },
      {
        main: "Ta colère a du message à délivrer — mais elle n'a pas besoin de te contrôler. 💨",
        support: "Si tu sens que ça déborde régulièrement, un thérapeute peut t'aider à canaliser cette énergie puissante de façon saine."
      },
      {
        main: "Merci de ne pas retenir ta colère — c'est plus sain de l'exprimer. Maintenant, prends du recul. 💨",
        support: "Écris-le, crie-le dans un coussin, fais du sport intensif — trouve une façon saine de te libérer."
      }
    ]
  },
  MOTIVATION: {
    keywords: ['motivé','motivation','énergie','déterminé','objectif','projet','envie de','ambition','rêve','réussir','avancer','progresser','déterminée','pouvoir','capable','force','champion'],
    responses: [
      {
        main: "Cette motivation que tu portes est une vraie flamme ! C'est une force magnifique. 🔥✨",
        support: "Canalise-la vers des petits objectifs concrets et atteignables. Chaque étape, chaque pas compte vraiment."
      },
      {
        main: "Quelle belle énergie ! La motivation est le moteur du vrai changement — tu as raison de la chérir. 🔥",
        support: "N'oublie pas de prendre soin de toi aussi. L'équilibre entre action et repos est la clé de la durabilité."
      },
      {
        main: "Ton enthousiasme est inspirant et je peux vraiment le sentir ! 🔥🌟",
        support: "Mets ton rêve par écrit — un plan d'action concret transforme cette énergie en résultats tangibles."
      },
      {
        main: "C'est magnifique de te voir porté(e) par cette force. Continue ! 🔥",
        support: "Célèbre chaque petite victoire en chemin — elles nourrissent ta motivation pour la suite."
      }
    ]
  },
  SOLITUDE: {
    keywords: ['seul','seule','solitude','isolé','isolée','personne','abandonné','incompris','incomprise','exclu','exclue','ignoré','personne pour','pas d\'ami','aucun','vide','perte de contact'],
    responses: [
      {
        main: "Se sentir seul(e) est une expérience très difficile — et tu as du courage en le partageant. 🌧💙",
        support: "Sache que tu as de la valeur intrinsèque, et que tu mérites vraiment des connexions authentiques et chaleureuses."
      },
      {
        main: "L'isolement peut être douloureux, mais ce que tu ressens est valide. Tu n'as pas à le porter seul(e). 🌧",
        support: "Essaie de tendre la main — même un petit message à une personne peut tout changer. N'abandonne pas."
      },
      {
        main: "La solitude peut être écrasante, mais tu n'es vraiment pas seul(e) en ça. Beaucoup d'autres le vivent aussi. 🌧💙",
        support: "Un professionnel peut t'aider à renouer avec les autres et surtout à renouer avec toi-même."
      },
      {
        main: "Je te vois et tu comptes vraiment. La solitude est temporaire — c'est une saison, pas une sentence. 🌧",
        support: "Cherche des communautés, des groupes, des forums basés sur tes intérêts. Connexions se construisent naturellement."
      }
    ]
  },
  CONFIANCE: {
    keywords: ['confiance','confidence','confiance en moi','crois en moi','je crois en toi','confiant','sûr de moi','doute','douter','trop critique','perfectionist','impostor','syndrome','nul','incapable'],
    responses: [
      {
        main: "La confiance en soi est un voyage, pas une destination — et tu es sur le bon chemin en te la poser. 🌟",
        support: "Chaque petit succès compte. Reconnais tes forces — qu'elles soient grandes ou petites. Tu les mérites."
      },
      {
        main: "Le doute est humain, mais il ne définit pas ta vraie valeur. 🌟",
        support: "Essaie ça : écris 3 choses dont tu es fier(e) aujourd'hui. Ça réinitialise ton perspective."
      },
      {
        main: "Tu as plus de force en toi que tu ne le crois — je te le promets. 🌟",
        support: "Un thérapeute ou un coach peut t'aider à reconnaître et renforcer la confiance qui existe déjà en toi."
      }
    ]
  },
  RELATION: {
    keywords: ['amour','copain','copine','amoureux','amoureuse','relation','couple','rupture','séparation','trahison','conflit','dispute','jaloux','jalouse','abandon','ex','petit ami','petite amie'],
    responses: [
      {
        main: "Les relations sont complexes et chargées d'émotions — ce que tu ressens est totalement valide. 💜",
        support: "Que ce soit une amitié, une relation amoureuse ou familiale, les connexions authentiques nécessitent de la communication honnête."
      },
      {
        main: "Les conflits relationnels peuvent être très douloureuse. Rappelle-toi que tu mérites du respect et de la bienveillance. 💜",
        support: "Si tu te sens maltraité(e), s'éloigner ou demander de l'aide n'est pas lâche — c'est une nécessité."
      },
      {
        main: "L'amour et les connexions humaines sont les plus belles et les plus complexes choses. 💜",
        support: "Sois honnête avec toi-même sur ce que tu veux et ce dont tu as VRAIMENT besoin dans tes relations."
      }
    ]
  },
  SANTÉ: {
    keywords: ['maladie','malade','mal','douleur','fatigue','fatigué','sommeil','dormir','santé','symptômes','médecin','hospitalisation','maladie mentale','dépression','trouble'],
    responses: [
      {
        main: "Les défis de santé peuvent être très difficiles à porter. Je suis là pour t'écouter. 💚",
        support: "Si c'est une question médicale, consulte un professionnel de santé. Pour le bien-être émotionnel, je peux vraiment t'accompagner."
      },
      {
        main: "Prendre soin de ta santé est un acte d'amour envers toi-même. 💚",
        support: "Somme, nourriture, mouvement, connexions — ce sont tous les piliers du bien-être holistique."
      }
    ]
  },
  GRATITUDE: {
    keywords: ['merci','reconnaissance','reconnaissant','grateful','reconnaître','chanceux','privilégié','bénédiction','favori','bonne journée','ça va mieux','suis guéri','heureux'],
    responses: [
      {
        main: "Ta gratitude me touche vraiment. C'est une façon belle de voir la vie. 🙏✨",
        support: "Cultive cette reconnaissance — elle est un antidote puissant contre la négativité."
      },
      {
        main: "C'est magnifique de t'entendre exprimer de la reconnaissance ! Continue à voir le bien. 🙏",
        support: "Partage cette gratitude avec les gens autour de toi — ça crée des ondes positives vraiment puissantes."
      }
    ]
  },
  NEUTRE: {
    responses: [
      {
        main: "Je t'écoute vraiment. 🌿",
        support: "Comment puis-je t'accompagner aujourd'hui ? Je suis ici pour toi."
      },
      {
        main: "Merci de me partager ça. 🌿",
        support: "Dis-moi en plus — je suis vraiment intéressé(e) à comprendre ce que tu ressens."
      },
      {
        main: "Je suis là pour toi, sans jugement. 🌿",
        support: "Qu'est-ce qui t'amène ici aujourd'hui ? Comment puis-je t'aider ?"
      },
      {
        main: "Parler c'est déjà un grand pas. 🌿",
        support: "Je suis tout ouïe — partage ce qui te pèse en ce moment."
      }
    ]
  }
};

const EMOJIS = {
  JOIE:'😊', TRISTESSE:'😢', STRESS:'😰', PEUR:'😨',
  COLERE:'😤', MOTIVATION:'🔥', SOLITUDE:'🌧', URGENCE:'🆘', 
  NEUTRE:'🌿', CONFIANCE:'⭐', RELATION:'💜', SANTÉ:'💚', GRATITUDE:'🙏'
};
