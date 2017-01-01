$(function () {
	
	// Initialise the game object on the HTML element with class 'wrapper'
	// Below is a list of all the questions and correct/incorrect answers in JSON format
	quiz = new TriviaQuiz($('.wrapper'), [
		{
			"question": "מה ההבדל בין הנדסה גנטית לביומימקרי?",
			"answers": [
				{ "text": "ביו-מימקרי עוסק בשינוי גנים של בעלי חיים ואילו הנדסה גנטית עוסקת בשינוי הגנים של צמחים.", "correct": false },
				{ "text": "ביו-מימקרי הוא שמו המדעי של תחום ההנדסה הגנטית.", "correct": false },
				{ "text": "ביו-מימקרי מחפש השראה ורעיונות בטבע בעוד הנדסה גנטית משנה את הטבע על ידי התערבות במבנה הגנטי של צמחים ושל בעלי חיים.", "correct": true },
				{ "text": "ביו-מימקרי משתמש בכלים מן הטבע כדי לתכנן גנים חדשים בעוד הנדסה גנטית משנה את הטבע על ידי התערבות במבנה הגנטי של צמחים.", "correct": false }
			]
		},
		{
			"question": "האם מדע הביומימיקרי הינו המצאה חדשה?",
			"answers": [
				{ "text":".מדע הביומימקרי הינו טכניקה שהשתמשו בה כבר במאה ה-16", "correct": true },
				{ "text": "מדע הביומימקרי הינו מדע חדש שנוסד על ידי חברות הייטק.", "correct": false },
				{ "text": "הביומימקרי הומצא במאה ה-19 במהפכה התעשייתית.", "correct": false },
				{ "text": "אין לדעת מתי הומצא מדע הביומימקרי.", "correct": false }
			]
		},
		{
			"question": "באיזו שיטה משתמשים בביומימיקרי כדי לתכנן מוצרים המבוססים על הטבע?",
			"answers": [
				{ "text": "אין שיטה מיוחדת", "correct": false },
				{ "text": "חשיבת תכנון (Design thinking)", "correct": true },
				{ "text": "רישום פטנטים", "correct": false },
				{ "text": "חשיבה מסועפת ומתכנסת ", "correct": false }
			]
		},
		{
			"question": "מה היה הפיתוח הראשון בהשראת ביומימיקרי בשנת 1505?",
			"answers": [
				{ "text": "המצאת נורת החשמל", "correct": false },
				{ "text": "המצאת ההליקופטר", "correct": true },
				{ "text": "המצאת הטלפון", "correct": false },
				{ "text": "המצאת המכונית", "correct": false }
			]
		},
		{
			"question": "מי היה המדען הראשון שידוע שהשתמש בביומימקרי  להמצאותיו?",
			"answers": [
				{ "text": "אלכסנדר בל", "correct": false },
				{ "text": "מיכלאנג'לו", "correct": false },
				{ "text": "תומס אלווה אדיסון", "correct": false },
				{ "text": "ליאונרדו דה-וינצ'י", "correct": true }
			]
		},
		{
			"question": "מהו כלי המחקר שבו משתמשים כדי ללמוד מהטבע?",
			"answers": [
				{ "text": "תצפית", "correct": true },
				{ "text": "שאלונים", "correct": false },
				{ "text": "ראיונות עם אנשים", "correct": false },
				{ "text": "ויקיפדיה", "correct": false }
			]
		}
	]);

});