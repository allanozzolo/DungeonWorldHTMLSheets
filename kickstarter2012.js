
$(document).ready(function () {

    $.addSourceData([ [ "CharacterClassPanel", {source: "Kickstarter 2012", name: "The Barbarian", damage: "d10", baseHp: 8, classIcon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 70"><path d="m 45,14 c -8.01,12.3299998 -9.72,15.0299998 -11.16,17.4599998 l 0,-8.01 c 0,-3.06 0.09,-5.6699998 0.09,-7.6499998 0,-1.89 -0.09,-3.149999 -0.45,-3.149999 -3.24,0 -9.99,6.209999 -9.99,9.0899988 0.18,1.53 0.81,4.32 1.08,8.19 -5.49,-9.27 -8.46,-14.3099998 -10.08,-17.2799988 -3.4200003,1.439999 -7.9200003,2.429999 -7.9200003,8.2799988 2.61,2.7 10.0800003,15.84 18.0900003,29.97 l 0,6.66 c 0,2.97 -0.09,5.76 -0.09,7.65 0,2.07 0.09,3.15 0.54,3.15 3.24,0 9.9,-6.21 9.9,-9.18 -0.18,-1.89 -1.17,-5.94 -1.17,-13.86 2.25,-6.66 8.64,-16.11 17.64,-30.6899998 0.18,-0.36 0.27,-0.63 0.27,-0.9 0,-0.809999 -0.81,-1.079999 -1.98,-1.079999 -1.62,0 -3.69,0.63 -4.77,1.349999 z" stroke="black" stroke-width="2" stroke-linejoin="round" fill="white" /></svg>', look1: 'Tormented eyes, Haunted eyes, Wide eyes, Shrouded eyes', look2: 'Mighty thews, Long shanks, Scrawny body, Supple body', look3: 'Strange tattoos, Unusual jewelry, Unmarred by decoration', look4: 'Scraps, Silks, Scavengers outfit, Weather-inappropriate clothes', subPanels: [ ['ClassAlignmentPanel', {alignment: 'Chaotic', move: 'Eschew a convention of the civilized world.' } ], ['ClassAlignmentPanel', {alignment: 'Neutral', move: 'Teach someone the ways of your people.' } ],
['ClassBondPanel', {bond: '_ is puny and foolish, but amusing to me.' } ],
['ClassBondPanel', {bond: '_\'s ways are strange and confusing.' } ],
['ClassBondPanel', {bond: '_ is always getting into trouble&mdash;I must protect them from themselves.' } ],
['ClassBondPanel', {bond: '_ shares my hunger for glory, the earth will tremble at our passing!' } ]
    ] } ] ]);

    $.addSourceData([ [ "RacePanel", {source: "Kickstarter 2012", name: "Outsider", subPanels: [ ['RaceClassPanel', {className: 'The Barbarian', move: "You may be elf, dwarf, halfling, or human, but you and your people are not from around here. At the beginning of each session, the GM will ask you something about your homeland, why you left, or what you left behind. If you answer them, mark XP.", names: "Gorm, Si-Yi, Priscilla, Sen, Xia, Anneira, Haepha, Lur, Shar, Doria, Nkosi, Fafnir, Qua, Sacer, Vercin'geto, Barbozar, Clovis, Frael, Thra-raxes, Sillius, Sha-Sheena, Khamisi, <br>, <em>Titles: </em>, the Glorious, the Hungry, the Irascible, the Undefeated, the Gluttonous, Foesmasher, Bonebreaker, the Mirthful, the Melancholic, All-Mighty, the Giant, the Triumphant" } ] ] } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: "Starting", maxLevel: 2, name: "Herculean Appetites", move: "Others may content themselves with just a taste of wine, or dominion over a servant or two, but you want more. Choose two appetites. While pursuing one of your appetites if you would roll for a move, instead of rolling 2d6 you roll 1d6+1d8. If the d8 is the higher die of the pair, the GM will also introduce a complication or danger that comes about due to your heedless pursuits.  <ul class='checkList'> <li>Pure destruction</li> <li>Power over others</li> <li>Mortal pleasures</li> <li>Conquest</li> <li>Riches and property</li> <li>Fame and glory</li> </ul>", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: "Starting", maxLevel: 2, name: "The Upper Hand", move: "You take +1 ongoing to last breath rolls. When you take your last breath, on a 7–9 you make an offer to Death in return for your life. If Death accepts he will return you to life. If not, you die.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: "Starting", maxLevel: 2, name: "Musclebound", move: "While you wield a weapon it gains the forceful and messy tags.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: "Starting", maxLevel: 2, name: "What Are You Waiting For? ", move: "When you cry out a challenge to your enemies, roll <span class='roll'>+Con</span>. &bull;&nbsp;On a 10+ they treat you as the most obvious threat to be dealt with and ignore your companions, take +2 damage ongoing against them. &bull;&nbsp;On a 7&ndash;9 only a few (the weakest or most foolhardy among them) fall prey to your taunting.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 1, maxLevel: 2, name: "Full Plate and Packing Steel", move: "You ignore the clumsy tag on armor you wear. ", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 1, maxLevel: 2, name: "Unencumbered, Unharmed", move: "So long as you are below your Load and neither wear armor nor carry a shield, take +1 armor.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Still Hungry", move: "Choose an additional appetite.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Appetite for Destruction", move: "Take a move from the fighter, bard or thief class list. You may not take multiclass moves from those classes.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "My Love For You Is Like a Truck", move: "When you perform a feat of strength, name someone present who you have impressed and take +1 forward to parley with them.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "What Is Best In Life", move: "At the end of a session, if during this session you have crushed your enemies, seen them driven before you, or have heard the lamentations of their kinfolk mark XP.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Wide-Wanderer", move: "You've travelled the wide world over. When you arrive someplace ask the GM about any important traditions, rituals, and so on, they'll tell you what you need to know.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Usurper", move: "When you prove yourself superior to a person in power, take +1 forward with their followers, underlings, and hangers on.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Khan of Khans", move: "Your hirelings always accept the gratuitous fulfillment of one of your appetites as payment.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Samson", move: "You may take a debility to immediately break free of any physical or mental restraint.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Smash!", move: "When you hack and slash, on a 12+ deal your damage and choose something physical your target has (a weapon, their position, a limb): they lose it.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 2, maxLevel: 10, name: "Indestructible Hunger", move: "When you take damage you can choose to take -1 ongoing until you sate one of your appetites instead of taking the damage. If you already have this penalty you cannot choose this option.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "A Good Day to Die", move: "As long as you have less than your Con in current HP (or 1, whichever is higher) take +1 ongoing.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "Kill 'em All", move: "Take another move from the Fighter, Bard or Thief class list. You may not take multiclass moves from those classes.", prerequisiteType: "Requires", prerequisite: "Appetite for Destruction" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "War Cry", move: "When you enter battle with a show of force (a shout, a rallying cry, a battle dance) roll <span class='roll'>+Cha</span>. &bull;&nbsp;On a 10+ both, &bull;&nbsp;on a 7&ndash;9 one or the other.<ul> <li>Your allies are rallied and take +1 forward</li> <li>Your enemies feel fear and act accordingly (avoiding you, hiding, attacking with fear-driven abandon)</li> </ul>", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "Mark of Might", move: "When you take this move and spend some time uninterrupted, reflecting on your past glories you may mark yourself with a symbol of your power (a long braid tied with bells, ritual scars or tattoos, etc). Any intelligent mortal creature who sees this symbol knows instinctively that you are a force to be reckoned with and treats you appropriately.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "More! Always More!", move: "When you satisfy an appetite to the extreme (destroying something unique and significant, gaining enormous fame, riches, power, etc) you may choose to resolve it. Cross it off the list and mark XP. While you may pursue that appetite again, you no longer feel the burning desire you once did. In its place, choose a new appetite from the list or write your own.", prerequisiteType: "None", prerequisite: "" } ] ]);

    $.addSourceData([ [ "ClassMovePanel", {source: "Kickstarter 2012", className: "The Barbarian", minLevel: 6, maxLevel: 10, name: "The One Who Knocks", move: "When you defy danger, on a 12+ you turn the danger back on itself, the GM will describe how.", prerequisiteType: "None", prerequisite: "" } ] ]);

});
