<script setup lang="ts">
import SvgIcon from '@jamescoyle/vue-icon'
import { Icons } from '../icons'

interface LexiconEntry {
  term: string
  definition: string
}

// Toutes les définitions affichées dans la fenêtre Lexique.
const lexiconEntries = [
  {
    term: 'Le Cœur Éternel',
    definition:
      'Selon les légendes, le Cœur Éternel se trouverait sur une île imprégnée d’une puissante magie régénératrice. Cette énergie maintiendrait encore le cœur d’un géant en activité et permettrait à une plante capable de guérir n’importe quelle maladie de pousser sur l’île.',
  },
  {
    term: 'Les créatures du Chaos',
    definition:
      'Les créatures du Chaos sont des êtres formés à partir de l’énergie chaotique des Landes Effacées. Elles émergent du Flou lorsque celui-ci devient trop dense et cherche à évacuer son accumulation d’énergie. Elles ne possèdent aucune humanité et n’existent que pour détruire.',
  },
  {
    term: 'Les Descendants Divins',
    definition:
      'Les Descendants Divins sont des individus choisis dès leur naissance par les Déesses-Mères. Personne ne sait pourquoi certains enfants sont choisis et d’autres non. Ils grandissent sur l’Île Sacrée, où ils développent ensuite une affinité avec une Déesse-Mère afin d’apprendre sa magie.',
  },
  {
    term: 'Les dragons',
    definition:
      'Les dragons sont de gigantesques créatures originaires des îles Kariga. Grâce à l’Osmetor présent dans l’atmosphère, ils peuvent voler sur de très longues distances sans s’épuiser. Les dragons crachent du feu en expulsant un mucus inflammable chauffé dans une chambre située dans leur gorge. À Nassalia, ils sont utilisés comme montures de guerre par les cavaliers de dragons.',
  },
  {
    term: 'Les géants',
    definition:
      'Les géants sont une ancienne civilisation ayant existé bien avant les événements actuels. Ils maîtrisaient la magie comme une extension naturelle d’eux-mêmes. Leur civilisation a disparu depuis des millénaires, mais leurs ruines et leurs corps sont encore dispersés à travers le monde.',
  },
  {
    term: 'La Greffe de Cristal',
    definition:
      'La Greffe de Cristal est le rituel marquant l’entrée complète dans la vie de Descendant. Les Descendants naissent avec un cristal à la place du cœur, mais vieillissent normalement jusqu’à ce qu’ils soient jugés prêts à manier pleinement l’énergie de leur Déesse-Mère. Durant la cérémonie, leur cœur-cristal est retiré et remplacé par celui d’un autre Descendant. Ce nouveau cœur leur confère l’immortalité et arrête leur vieillissement physique. Le Descendant ayant donné son cœur perd alors son immortalité et recommence à vieillir normalement. Cette transmission est souvent considérée comme une forme de retraite chez les Descendants plus âgés.',
  },
  {
    term: 'L’Île Sacrée',
    definition:
      'L’Île Sacrée est un territoire réservé uniquement aux Descendants Divins. Ils y grandissent et y apprennent la magie. Une fois adultes, ils peuvent choisir d’y rester ou de voyager à travers le monde. Ils doivent toutefois retourner régulièrement sur l’île afin de conserver leur lien avec leur Déesse-Mère.',
  },
  {
    term: 'Les îles Kariga',
    definition:
      'Les îles Kariga sont un archipel flottant où naissent les dragons. Le peuple des îles est pacifique et évite les conflits avec le reste du monde.',
  },
  {
    term: 'Les Landes Effacées',
    definition:
      'Les Landes Effacées forment une immense frontière de Flou entourant complètement Firaluna. L’énergie chaotique y est si dense que la réalité elle-même s’y déforme.',
  },
  {
    term: 'La mer de Blezora',
    definition:
      'La mer de Blezora est une immense mer parsemée d’îles. D’un côté se trouvent les Landes Effacées ; de l’autre, un canal réputé pour ses pirates. En son centre se situent les Terres Englouties.',
  },
  {
    term: 'Les Mérafleurs',
    definition:
      'Les Mérafleurs sont des créatures d’eau douce ressemblant à des sirènes. Elles vivent dans les Territoires Engloutis et se camouflent parmi les nénuphars afin d’attirer leurs proies. Très territoriales, elles attaquent les étrangers naviguant dans leurs eaux.',
  },
  {
    term: 'Nassalia',
    definition:
      'Nassalia est le royaume possédant la plus grande influence politique, économique et militaire du continent. Son armée combat les créatures du Chaos dans les Landes Effacées.',
  },
  {
    term: 'Les Naufragobes',
    definition:
      'Les Naufragobes sont des créatures marines carnivores servant le Roi Crapaud. Leur peuple vit principalement dans les marais et les eaux peu profondes, où ils construisent leurs communautés. Bien qu’ils préfèrent les régions d’eau douce, ils tolèrent aussi l’eau salée. Les chasseurs Naufragobes s’aventurent régulièrement en mer afin de provoquer des naufrages et rapporter les corps au reste du groupe.',
  },
  {
    term: 'L’Ordre et le Chaos',
    definition:
      'L’Ordre et le Chaos sont les deux principes fondamentaux du monde. Ces forces cosmiques opposées doivent coexister afin de maintenir l’équilibre de la réalité.',
  },
  {
    term: 'L’Osmetor',
    definition:
      'L’Osmetor est un gaz extrêmement dense provoquant un effet d’apesanteur. Il est présent en grande quantité dans certaines régions de Firaluna.',
  },
  {
    term: 'Septamatria',
    definition:
      'La Septamatria est le nom donné aux sept Déesses-Mères formant un tout : Nara, Veram, Ymera, Zurna, Canéa, Motunira et Dastra. Ensemble, elles gouvernent les énergies du monde.',
  },
  {
    term: 'La surcharge muqueuse',
    definition:
      'La surcharge muqueuse est une maladie affectant certains dragons. Leur gorge accumule une quantité anormale de mucus inflammable, pouvant provoquer une rupture interne et l’explosion du dragon.',
  },
  {
    term: 'Les Terres Englouties',
    definition:
      'Les Terres Englouties sont une ancienne région recouverte par les eaux depuis des siècles. On y trouve des ruines de géants, d’immenses étendues inondées et de nombreux lacs d’eau douce.',
  },
  {
    term: 'Tlezos',
    definition:
      'Tlezos est une région connue pour ses immenses crevasses et ses falaises gigantesques. L’Osmetor s’échappe des profondeurs du territoire, faisant flotter certains ossements de géants au-dessus des nuages.',
  },
  {
    term: 'Les Vromitiens',
    definition:
      'Les Vromitiens étaient autrefois un puissant peuple marin réputé pour ses guerriers et ses mercenaires. Leur proximité avec les Landes Effacées provoqua toutefois de nombreuses attaques des créatures du Chaos, forçant leur peuple à constamment fuir et reconstruire. Avec le temps, la survie devint plus importante que la guerre. Les derniers Vromitiens vivent aujourd’hui cachés dans des ruines de géants submergées.',
  },
] satisfies LexiconEntry[]

defineEmits<{
  close: []
}>()
</script>

<template>
  <!-- Fenêtre du lexique par-dessus la page. -->
  <Teleport to="body">
    <div class="lexicon-modal-backdrop" role="presentation" @click.self="$emit('close')">
      <section class="lexicon-modal" role="dialog" aria-modal="true" aria-label="Lexique">
        <header class="lexicon-header">
          <h2 class="lexicon-title">Lexique</h2>
        </header>

        <div class="lexicon-content">
          <dl class="lexicon-list">
            <div v-for="entry in lexiconEntries" :key="entry.term" class="lexicon-entry">
              <dt class="lexicon-term">{{ entry.term }}</dt>
              <dd class="lexicon-definition">{{ entry.definition }}</dd>
            </div>
          </dl>
        </div>

        <button
          class="close-lexicon-button"
          type="button"
          aria-label="Fermer le lexique"
          title="Fermer le lexique"
          @click="$emit('close')"
        >
          <SvgIcon class="close-lexicon-icon" type="mdi" :path="Icons.Close" :size="20" aria-hidden="true" />
        </button>
      </section>
    </div>
  </Teleport>
</template>

<style scoped>
.lexicon-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.72);
  padding: clamp(18px, 3vw, 56px);
}

.lexicon-modal {
  position: relative;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  width: min(88vw, 1080px);
  max-height: min(86vh, 920px);
  border: 1px solid rgba(var(--artbook-gold-rgb), 0.58);
  background:
    linear-gradient(180deg, rgba(31, 31, 42, 0.98), rgba(8, 8, 14, 0.98));
  box-shadow:
    0 26px 86px rgba(0, 0, 0, 0.78),
    0 0 0 8px rgba(4, 4, 9, 0.34),
    inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.lexicon-header {
  padding: clamp(18px, 2.2vh, 34px) clamp(24px, 3vw, 52px) clamp(10px, 1.3vh, 18px);
}

.lexicon-title {
  color: var(--artbook-gold);
  font-size: clamp(1.8rem, 3.4vh, 3.6rem);
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1;
  text-transform: uppercase;
  text-shadow:
    0 1px 0 rgba(255, 255, 255, 0.2),
    0 3px 0 rgba(20, 14, 28, 0.9),
    0 0 22px rgba(226, 193, 105, 0.36);
}

.lexicon-content {
  min-height: 0;
  overflow-y: auto;
  padding: 0 clamp(24px, 3vw, 52px) clamp(24px, 3vh, 46px);
}

.lexicon-list {
  display: grid;
  gap: clamp(14px, 1.7vh, 24px);
}

.lexicon-entry {
  border-top: 1px solid rgba(var(--artbook-gold-rgb), 0.24);
  padding-top: clamp(12px, 1.45vh, 20px);
}

.lexicon-term {
  color: var(--artbook-gold);
  font-size: clamp(1rem, 1.45vh, 1.38rem);
  font-weight: 800;
  line-height: 1.2;
}

.lexicon-definition {
  color: var(--artbook-text-warm);
  font-size: clamp(0.88rem, 1.22vh, 1.1rem);
  line-height: 1.5;
  margin-top: clamp(6px, 0.7vh, 10px);
}

.close-lexicon-button {
  position: absolute;
  right: clamp(10px, 1.1vh, 16px);
  top: clamp(10px, 1.1vh, 16px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: clamp(30px, 3vh, 46px);
  height: clamp(30px, 3vh, 46px);
  border: 1px solid rgba(var(--artbook-gold-bright-rgb), 0.62);
  background: rgba(0, 0, 0, 0.55);
  color: var(--artbook-gold);
  cursor: pointer;
  padding: 0;
}

.close-lexicon-button:hover,
.close-lexicon-button:focus-visible {
  background: rgba(0, 0, 0, 0.75);
  outline: none;
}

.close-lexicon-icon {
  width: clamp(17px, 1.85vh, 28px);
  height: clamp(17px, 1.85vh, 28px);
}

@media (max-width: 900px) {
  .lexicon-modal {
    width: 94vw;
    max-height: 84vh;
  }
}
</style>
