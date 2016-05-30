app.factory('Auth', function (furl, $firebaseArray) {

    /*
     Syntaxe à utiliser dans tes controllers :

     !!injecter le service comme dépendance dans le controllers!!

     brut = NomDuService.MethodeEt/OuPropriété.Function

     Par ex pour recup le current user :

     Auth(<=Tu te place dans l'objet, ici le nom du service).getCurrentUserDataLog(puis tu appel la function qui elle me contient la fonction firebase qui te retourne un object content les info dans la variable currentUser)

     sa donne un truc du genre : Auth.getCurrentUserDataLog ( sa c'est dans ton controller ne touche pas au service surtout)

     Certaine fois, selon les donnée que tu veux recuperer, tu serai obliger entre Auth et t'as fonction de faire une connect a firebase par ex == Auth.ref.function... (ref est une variable qui contient l'url de la base de donnée)

     Dans chaque methode ci-dessous jt'ai stocker dans une variable l'objet retourné par la methode.
     La cette requete retourne un object Json du genre :

     Object {provider : "password", uid :"1858446465464....", email : "blabla@gmail.com" ect ect}

     si tu veux seulement recup l'id de l'user, tu va dans ton controller:

     1) tu crée une variable qui va contenir t'as fonction, garde le meme nom de variable que dans le service
     var currentUser = Auth.getCurrentUserDataLog();

     console.log(currentUser); <= sa va t'afficher une object avec plusieur info

     2) pour l'id t'as juste a faire :

     console.log(currentUser.uid); <= sa sa te retourne l'uid contenu dans ton object global stocker dans currentUser.

     3) si tu veux stocker l'id de l'user t'as juste a faire :

     var currentUserId = currentUser.uid


     */

        var ref = new Firebase(furl); // propriété qui contien l'url de la base

    return{
        ref: function () {
            return ref;
        }
    }

});
