# Gem photo360

L'objectif de la gem est de permettre de gérer des photos 360° de produits
On s'appuie sur la librairie javascript 3deye

## Elements de configuration

Via un initializer dans le projet, il doit être possible de configurer :
- [ ] Différentes tailles prédéfinies et nommées pour les images. Par exemple : small: 650* 650 / big: 1500*1500

Dépendance de gems :
- [ ] [Dragonfly](https://github.com/markevans/dragonfly) (pour redimensionner les photos)
- [ ] Une gem pour décompresser les fichiers zip

## Sources

Les photos sont transmise par un zip unique contenant les photos du produit.
Le nombre de photos peut-être variable mais si besoin, on peut simplifier en fixant ce nombre a 30 comme utilisé dans l'exemple fourni
Dans tous les cas, les photos seront nommées de 1 à 30 (si on a fixé cette valeur) comme dans l'exemple fourni.

## Méthodes fournies par la gem

Il doit être possible de spécifier qu'un champs d'un modèle sera un 360°.
En faisant ainsi ce champs aura les méthodes suivantes :

- [ ] `modèle.champs.photo360.format` (exemple : `product.image.photo360.small`) :
Cette méthode va afficher le 360°. elle prendra les options suivantes : "class:", "href:", "style:" pour paramétrer le container qui affiche le 360°

Le code HTML rendu par cette méthode sera le suivant :

```erb
<div id="[identifiant_unique]" class="[options]" href="[options]" style="[options]">
</div>

<script>
$( document ).on('turbolinks:load', function() {
    $("#[identifiant_unique]").vc3dEye({
        imagePath:"[chemin_photos]",
        totalImages:[nb_images],
        imageExtension:"[format des images]"
    });
});
</script>
```

- [ ] `modèle.champs.photo360_stored?` :
Cette méthode retourne vrai si un 360° a été choisi pour ce champs

- [ ] `modèle.champs.photo360_preview` :
Cette méthode retourne une url de la première photo du 360

- [ ] `photo360_list` :
Retourne un hash de l'ensemble des photos 360 enregistrées (il conviendra donc de créer une table pour stocker cette liste lors de l'ajout d'un zip sur un modèle)

le hash sera de la forme : `{"identifiant" => "identifiant_unique", "name" => "nom_du_zip", "preview" => "url_première_photo", "in" => [Model]}`

- [ ] `modèle.champs.photo360_reassign identifiant_unique` :
Permet de réassigner un 360° à l'élément choisi (efface donc l'élément précédent pour le réaffacter au nouveau)

Model étant un objet de l'élément sur lequel le 360° a été enregistré. Par exemple un produit

- [ ] `photo360_stylesheet_link_tag` :
Ajoute la feuille de style de la gem. Soit une feuille de style par défaut inclue dans la gem, soit une feuille de style avec le même nom présente dans le projet

- [ ] `photo360_javascript_link_tag` :
Ajoute la librairie javascript de la gem. Inutile de s'occuper de la dépendance a jquery (ce serait un plus pour rendre la gem utilisable n'importe où mais ici, on a déjà jquery dans le projet ou la gem sera utilisée)

## Actions de la gem

Lors de la sauvegarde du modèle, le zip est décompressé et les photos contenues dedans sont redimensionnées aux différentes tailles paramétrées. On pourra utiliser Dragonfly pour cela.

Tâche pour la création de la table utilisée par la gem

## Javascript

Modifier le code de la librairie javascript pour permettre un chargement asynchrone des images. On chargera uniquement l'image 29,30,1,2,3 au chargement de la page, les autres images sont ajoutées de manière asynchrone. Cela permet d'accélerer l'affichage du 360°

Ajouter une option "sens" pour inverser le sens de défilement des photos. Si cette option javascript est ajoutée, il faudra permettre de spécifier le sens de rotation dans le helper front (`modèle.champs.photo360.format`)


## Documentation

Une courte documentation pour l'installation de la gem (tâche pour générer la ou les tables nécessaires, exemple d'initializer, nommage du fichier de styles)

## Conseil

Je me suis pas mal inspiré de Dragonfly pour les méthodes que je demande. Tu devrais donc pouvoir t'en inspirer pour réaliser cette gem.
En rédigeant ce petit cahier des charges, je me rends compte que c'est un test assez complexe. Donc fait au mieux de ce que tu arrives a faire mais si tu n'arrives pas a tout faire ou si tu dois faire des modifications, cela ne pose pas de soucis. Tu peux aussi m'appeler si tu as des questions.
Enfin pour te simplifier la vie dans tes tests, gem fourni un serveur pour héberger ses propres gems : gem server. Ainsi, tu peux très rapidement modifier ta gem et la mettre a jour sur un petit projet de test local.
