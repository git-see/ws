import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import TeamCrud from "./pages/TeamCrud";
import AllProjects from "./pages/AllProjects";
import AddProject from "./pages/AddProject";
import OneProject from './pages/OneProject';
import AddTask from "./pages/AddTask";
import TasksByRole from "./pages/TasksByRole";
import "./css/app.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teamcrud" element={<TeamCrud />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/oneproject/:projectId" element={<OneProject />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/allprojects/:id/tasks/:id" element={<TasksByRole />} />
      </Routes>
    </>
  );
}

export default App;

/*
CREATE TABLE votre_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  projectstatus ENUM('en_attente', 'en_cours', 'terminé') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
 */

/*
Je créé un site de gestion de projets en REACT où chaque projet montre les tâches effectuées par chacun des rôles. Dans phpmyadmin, on a donc au total 3 tableaux: role, tache et projet. Dans le tableau projet on spécifie le nom du projet et on ajoute le role et la tache relatifs au projet. dans le tableau tache on spécifie le role qui a effectué la tâche car 1 rôle peut avoir effectué p^lusieurs ta^ches. Par contre, une tâche n'est faite que par 1 seul rôle. Je veux afficher le role et la tache d'un projet. Quelle requête SQL écrire pour afficher un projet qui détaille le rôle et les tâches? Explique en détails. et donne un exemple avec des commentaires.
ChatGPT

Pour afficher les rôles et les tâches associés à un projet dans une base de données relationnelle, vous devez établir des relations entre vos tables. Voici un exemple de la structure des tables et une requête SQL qui vous permettra d'obtenir les informations souhaitées.
Structure des tables

    Table role :
        id (clé primaire, entier)
        nom (varchar)

    Exemple de contenu :

     
    | id | nom        |
    |----|------------|
    | 1  | Développeur|
    | 2  | Designer   |

    Table tache :
        id (clé primaire, entier)
        description (varchar)
        role_id (clé étrangère, entier référant à role.id)

    Exemple de contenu :

     
    | id | description           | role_id |
    |----|-----------------------|---------|
    | 1  | Développer la page A | 1       |
    | 2  | Créer le logo        | 2       |

    Table projet :
        id (clé primaire, entier)
        nom (varchar)
        tache_id (clé étrangère, entier référant à tache.id)

    Exemple de contenu :

     
    | id | nom         | tache_id |
    |----|-------------|----------|
    | 1  | Projet Alpha| 1        |
    | 2  | Projet Alpha| 2        |

Requête SQL

Pour afficher les rôles et les tâches d'un projet spécifique, vous pouvez utiliser une requête SQL de type JOIN pour relier les trois tables. Voici comment vous pouvez écrire cette requête :

 
SELECT 
    p.nom AS projet_nom,
    r.nom AS role_nom,
    t.description AS tache_description
FROM 
    projet p
JOIN 
    tache t ON p.tache_id = t.id
JOIN 
    role r ON t.role_id = r.id
WHERE 
    p.nom = 'Projet Alpha';

Explication de la requête

    Sélection des colonnes :
        p.nom AS projet_nom : Cela sélectionne le nom du projet et l'alias projet_nom pour la colonne.
        r.nom AS role_nom : Cela sélectionne le nom du rôle et l'alias role_nom.
        t.description AS tache_description : Cela sélectionne la description de la tâche et l'alias tache_description.

    Tables impliquées :
        FROM projet p : Cela indique que la table de base est projet et lui donne l'alias p.
        JOIN tache t ON p.tache_id = t.id : Cela relie la table projet à la table tache en utilisant tache_id de projet et id de tache.
        JOIN role r ON t.role_id = r.id : Cela relie la table tache à la table role en utilisant role_id de tache et id de role.

    Filtrage :
        WHERE p.nom = 'Projet Alpha' : Cela filtre les résultats pour ne montrer que les tâches et rôles associés au projet nommé "Projet Alpha".

Exemple de résultat

Pour le projet "Projet Alpha", vous obtiendriez un résultat comme ceci :

 
| projet_nom    | role_nom      | tache_description          |
|---------------|---------------|----------------------------|
| Projet Alpha  | Développeur   | Développer la page A      |
| Projet Alpha  | Designer      | Créer le logo             |

Cela vous donne un tableau avec les rôles et les tâches effectuées pour le projet spécifié.
*/
