const i18n = {
  en: {
    translation: {
      'dialog': {
        'cookies':"Securty Warning.\n\nCookies will allow all people who have access to your computer to:\n1) know you have access to the map\n2) edit the map without a password\n\nBut they'll make it easier to login.\nDo you want cookies?"
      },
      'error': {
        'refused': "Could not connect to backend...",
      },
      'navbar': {
        'home': 'Home',
        'tutorial': 'Tutorial',
        'contact': 'Contact',
        'exportAsPDF': 'as PDF',
        'exportAsSVG': 'as SVG',
        'exportAsPNG': 'as PNG',
        'login': 'Log in',
        'logout': 'Log out',
        'authorization': 'Authorization',
        'published': 'Published',
        'private': 'Private'
      },
      'navsteps': {
        'form': 'Basic Data',
        'bbox': 'Select extract',
        'map': {
          'edit': 'Draw map',
          'static': 'Map',
          'introduction': 'This map extract will be your new Aktionskarte. You can use the toolbar on the left to place rally routes, markers or mark an area. If you\'re done, click on preview.',
        },
        'preview': 'Preview',
        'download': 'Download'
      },
      'home': {
        'newMap': 'Create new map',
        'headline': 'Maps for you political actions',
        'description': 'An Aktionskarte consists of a map extract where you can find important information like a demo route or individual points of interest. These maps should help you and your comrades to locate yourself in an unkown area.',
      },
      'tutorial': {
        'headline': 'How can I create an Aktionskarte?',
      },
      'preview': {
        'title': 'Map preview',
        'description': 'Below you see what your final map would look like. You can export it in different formats for different use cases. Use PDF for print, PNG for sharing on social media or messengers and SVG if you want to enhance the map using other software.',
        'generating': 'Generating preview',
        'publish': {
          'label': 'Publish',
          'description': 'Your map will not be listed on our website unless you publish it. Keep in mind that everyone who knows the URL of your map, can still access it.',
        },
        'export': {
          'title': 'Download',
          'pdf': 'Print (PDF)',
          'png': 'Image (PNG)',
          'svg': 'Processing (SVG)'
        },
        'share': {
          'title': 'Share',
          'social': {
            link: 'Social networks',
            title: 'Share this map on a social media plattform',
            msg: 'Map for {{name}} on {{date}} in {{place}}\n\n{{-linkPDF}}',
          },
          'html': {
            link: 'Blog (HTML)',
            title: 'Embedd this map into your own website',
          }
        }
      },
      'contact': {
        'headline': 'Mail',
        'introduction': 'You have comments, questions or want to contact us? Just write us an eamil',
        'preGPG': 'If possible then encrypt your mail. Our PGP key can be found <a href="{{gpgLink}}">here</a>  or just get it from a public key server.',
        'postGPG': 'You can also download the key with your mail client. Pay attention that the <i>fingerprint</i> is the same as the one shown above.',
      },
      'remark': {
        'headline': 'Remark',
        'description': 'Aktionskarten is inspired by the work of <a href="https://aktionskarten.noblogs.org/">Kartographische Aktion</a>. They provide maps for example for demonstrations. Furthermore, they wrote a tutorial how you can make maps on your own. Our idea was to simplify this further. We use their icon set in our editor.'
      },
      'sources': {
        'headline': 'Sources',
        'description': 'All components of Aktionskarten are open source. You can find them here:',
      },
      'form': {
        'title': 'Map data',
        'createMap': 'Create new map',
        'editMapTitle': 'Edit map',
        'editMap': 'Save',
        'deleteMap': 'Delete map',
        'deleteText': 'Do you really want delete this map?',
        'cancel': 'Cancel',
        'saved': 'Saved',
        'name': {
          'label': 'Name',
          'placeholder': 'What is the name?',
          'description': 'The name will be displayed in the top left corner of your map.',
        },
        'place': {
          'label': 'Place',
          'placeholder': 'Where does it happen?',
          'description': 'A place is necessary because people need to know where your action takes place.'
        },
        'mapExtract': {
          'label': 'Map extract',
          'button':'Change map extract',
        },
        'date': {
          'label': 'Date',
          'placeholder': 'When does it happen?',
          'description': 'Will be rendered below the name of your map.'
        },
        'description': {
          'label': 'Description',
          'placeholder': 'Put here your call for action.',
          'description': 'It will be displayed on the backside of your map.'
        },
        'legend': {
          'label': 'Extra information',
          'placeholderKey': 'Key',
          'placeholderValue': 'Value',
          'button': 'Add',
          'description': 'Here, you can save information in so called key-value pairs. This could be <i>Twitter-@account</i>, <i>EA-0891234</i> or <i>Hashtag-#B0803</i>. They will be rendered on your map.',
        },
        'modal': {
          'title': 'Map {{name}} has been created',
          'button': 'Select map extract',
          'introduction': 'Just you and your friends should be able to edit the map. Therefor the following an autogenerated token has been created:',
          'adminLink': 'Admin Link',
          'adminLinkText': 'Only who knows this token can edit the map. You can either save the token above or use the following admin link:',
          'publicLink': 'Public Link',
          'publicLinkText': 'With the rest you share the the following link:'
        }
      }
    }
  },
  de: {
    translation: {
      'dialog': {
        'cookies':"Sicherheitswarnung.\n\nCookies erlauben Menschen, die Zugriff auf deinen Rechner haben:\n1. Die Karte ohne Passwort zu editieren\n2. herauszufinden, dass du Zugriff auf die Karte hast\n\nAllerdings machen sie das einloggen einfacher.\nWillst du die Cookies?"
      },
      'error': {
        'refused': "Verbindung zum Server fehlgeschlagen...",
      },
      'navbar': {
        'home': 'Überblick',
        'tutorial': 'Anleitung',
        'contact': 'Kontakt',
        'exportAsPDF': 'als PDF',
        'exportAsSVG': 'als SVG',
        'exportAsPNG': 'als PNG',
        'login': 'Anmelden',
        'logout': 'Abmelden',
        'authorization': 'Autorisierung',
        'published': 'Öffentlich',
        'private': 'Privat'
      },
      'navsteps': {
        'form': 'Grunddaten',
        'bbox': 'Ausschnitt wählen',
        'map': {
          'edit': 'Aktion zeichnen',
          'static': 'Karte',
          'introduction': 'Der Ausschnitt auf der Karte stellt deine Aktionskarte dar. Mittels der Toolbar links, kannst du Demorouten und Marker plazieren oder Gegenenden markieren. Wenn du fertig bist, klicke auf Vorschau.',
        },
        'preview': 'Vorschau',
        'download': 'Herunterladen'
      },
      'home': {
        'headline': 'Karten für deine direkte Aktion',
        'description': 'Eine Aktionskarte besteht aus einem Kartenausschnitt, in dem wichtige Informationen wie eine Demoroute oder interessante Orte markiert sind. So eine Karte soll dir und deinen Mitstreiter*innen helfen, sich am Ort des Geschehens leichter zurechtzufinden.',
        'newMap': 'neue Karte erstellen',
      },
      'tutorial': {
        'headline': 'Wie erstelle ich eine Aktionskarte?',
      },
      'preview': {
        'title': 'Kartenvorschau',
        'description': 'Weiter unten siehst du wie deine Karte aussehen würde. Du kannst sie in verschiedenen Formaten exportieren. Zum Ausdrucken nutze PDF, für das Teilen in Sozialen Netzwerken oder in Messengern nutze PNG und wenn du selbst deine Karte noch in einem anderen Programm weiterverarbeiten willst, wähle SVG.',
        'generating': 'Vorschau wird generiert',
        'publish': {
          'label': 'Veröffentlichen',
          'description': 'Deine Karte wird nicht auf unserer Website angezeigt solange du sie nicht veröffentlich hast. Beachte dabei das jede*r die Karte dennoch aufrufen kann sofern sie den Link dazu kennt.',
        },
        'export': {
          'title': 'Herunterladen',
          'pdf': 'Ausdruck (PDF)',
          'png': 'Bild (PNG)',
          'svg': 'Bearbeitung (SVG)'
        },
        'share': {
          'title': 'Teilen',
          'social': {
            link: 'Soziale Netzwerke',
            title: 'Teile diese Karte in einem Sozialen Netzwerk',
            msg: 'Aktionskarte für {{name}} am {{date}} in {{place}}\n\n{{-linkPDF}}',
          },
          'html': {
            link: 'Blog (HTML)',
            title: 'Binde diese Karte in deine eigene Website ein',
          }
        }
      },
      'contact': {
        'headline': 'Mail',
        'introduction': 'Du hast Anmerkungen, Fragen oder willst mit uns in Kontakt treten? Schreib uns einfach eine Mail',
        'preGPG': 'Wenn möglich dann am besten verschlüsselt. Unser PGP Schlüssel findest du <a href="{{gpgLink}}">hier</a> oder lade ihn von einem öffentlichen Schlüsselserver runter.',
        'postGPG': 'Du kannst ihn natürlich auch über deinen Mailclient runterladen. Achte dabei, dass der <i>Fingerprint</i> dem obigen entspricht.',
      },
      'remark': {
        'headline': 'Anmerkungen',
        'description': 'Aktionskarten basiert auf Ideen und Arbeit von <a href="https://aktionskarten.noblogs.org/">Kartographische Aktion</a>. Sie stellen Karten zum Beispiel für Demonstrationen zur Verfügung und haben auch eine Anleitung verfasst wie du selbst solche Karten erstellen kannst. Unsere Idee war dies noch weiter zu vereinfachen. Die von uns verwendeten Bilder der Marker sind u.a. von ihnen.'
      },
      'sources': {
        'headline': 'Quelltexte',
        'description': 'Alle Komponenten von Aktionskarten sind freie Software. Du kannst sie hier finden:'
      },
      'form': {
        'title': 'Kartendaten',
        'createMap': 'Neue Aktionskarte erstellen',
        'editMapTitle': 'Karte bearbeiten',
        'editMap': 'Speichern',
        'deleteMap': 'Karte löschen',
        'deleteText': 'Willst du diese Karte wirklich löschen?',
        'cancel': 'Abbrechen',
        'saved': 'Gespeichert',
        'name': {
          'label': 'Name',
          'placeholder': 'Name der Aktion',
          'description': 'Der Name wird als Überschrift oben links auf deiner Aktionskarte stehen.',
        },
        'place': {
          'label': 'Ort',
          'placeholder': 'Ort der Aktion',
          'description': 'Ein Ort ist notwendig, damit die Leute wissen wo deine Aktion stattfindet. Er wird auch auf der Karte unter dem Namen erscheinen.',
        },
        'mapExtract': {
          'label': 'Kartenausschnitt',
          'button': 'Kartenausschnitt ändern',
        },
        'date': {
          'label': 'Datum',
          'placeholder': 'Wann findet es statt?',
          'description': 'Datum und Zeit werden unter der Überschrift auf der Karte erscheinen',
        },
        'description': {
          'label': 'Beschreibung',
          'description': 'Pack hier deinen Aufruf rein. Er wird zum Beispiel beim PDF-Export auf der Rückseite der Aktionskarte erscheinen.'
        },
        'legend': {
          'label': 'Zusatzinfos',
          'placeholderKey': 'Schlüssel',
          'placeholderValue': 'Wert',
          'button': 'Hinzufügen',
          'description': 'Hier gespeicherte Schlüssel-Werte-Paare sollen dir ermöglichen wichtige Informationen zu hinterlegen. Beispiele sind <i>Twitter-@account</i>, <i>EA-0891234</i> oder <i>Hashtag-#B0803</i>. Diese werden dann auf deiner Aktionskarte hinterlegt.',
        },
        'modal': {
          'title': 'Karte {{name}} wurde erstellt',
          'button': 'Kartenausschnitt auswählen',
          'introduction': 'Damit nur du und deine Freunde die Karte bearbeiten können gibt es ein zufallsgeneriertes Passwort:',
          'adminLink': 'Admin-Link',
          'adminLinkText': 'Nur wer im Besitz des Passworts ist kann die Karte bearbeiten. Das heißt: Entweder speicherst du dir das Passwort gut ab oder du benutzt folgenden Admin-Link:',
          'publicLink': 'Public-Link',
          'publicLinkText': 'Mit allen anderen teilst du nur folgenden öffentlichen Link:'
        }
      },

      'Loading': 'Wird geladen',

      // Error messages from backend
      'Map already exists. Use another name!': 'Karte existiert bereits. Wähle einen anderen Namen!'
    },
  },
}

export default i18n
