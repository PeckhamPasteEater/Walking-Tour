const locations = [
  {
    id: "duvenecks_arrival",
    title: "Duvencks Part 1: The Duvenecks Arrive in the Bay Area",
    lat: 37.44472,
    lng: -122.15298,
    description:
      "Part 1 of a series of sites celebrating the founders of Hidden Villa, the Duvenecks. The Duvenecks, born in to East Coast privilege, had visited, and, as such, been enchanted by California in their travels around the world. However, it wasn’t until a particularly harsh winter in their native Boston that they decided to officially light out for the West. As World War I raged, they settled in temperate Santa Barbara for a short period, only to move to Carmel and later Tacoma, Washington on account of Frank’s enlisting as an engineer in the military. Soon, Frank was sent to the European theatre of war, but not before ensuring Josephine learned how to drive a Ford Model T. Eight months pregnant with her third child, Josephine brought the family to Palo Alto in 1918, then and still a university town, albeit then one of under 5,000 residents. Josephine rented a house here, at the crook of Addison and Cowper.",
    image: ""
  },
  {
    id: "duvenecks_return",
    title: "Duvenecks Part 2: Frank and Josephine Return",
    lat: 37.44855,
    lng: -122.14005,
    description:
      "Part 2 of a series of sites celebrating the founders of Hidden Villa, the Duvenecks. Read preceding sites for complete narrative. Frank was only away for one year. Much had changed; after giving birth to Hope in Palo Alto, Josephine had also gone away to care for Frank’s father in Cincinnati, Ohio, who had developed cancer due to a lifetime of smoking. When Josephine returned, she bought a house here on Newell Road for a sum total of $7,500. What is now South Bay suburban sprawl was once the city’s limit. The Duvenecks, standing here, would be perched on the edge of human settlement. The year was 1919; as a member of the occupying force of Germany, Frank remained after the armistice until August. When he returned, he saw his daughter for the first time.",
    image: ""
  },
  {
    id: "test",
    title: "Test",
    lat: 37.38323,
    lng: -122.09449,
    description: "Test",
    image: ""
  },
  {
    id: "elizabeth_gamble_garden",
    title: "Elizabeth F. Gamble Garden",
    lat: 37.4400122,
    lng: -122.1482255,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "hp_garage",
    title: "HP Garage",
    lat: 37.44307,
    lng: -122.15481,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "roth_building",
    title: "Roth Building (now Palo Alto History Museum)",
    lat: 37.44361,
    lng: -122.15722,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "stanford_theatre",
    title: "Stanford Theatre",
    lat: 37.4450694,
    lng: -122.16270,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "kee_house",
    title: "Kee House",
    lat: 37.4245556,
    lng: -122.1474444,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "squire_house",
    title: "Squire House",
    lat: 37.453056,
    lng: -122.153056,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "hanna_house",
    title: "Hanna House",
    lat: 37.4160139,
    lng: -122.1635528,
    description: "Placeholder. In collaboration with the Museum of American Heritage",
    image: ""
  },
  {
    id: "palo_alto_tower_well",
    title: "Palo Alto Tower Well",
    lat: 37.4459921,
    lng: -122.1673342,
    description: "Placeholder. In collaboration with the Museum of American Heritage",
    image: ""
  },
  {
    id: "frenchmans_tower",
    title: "Frenchman's Tower",
    lat: 37.396311,
    lng: -122.161784,
    description: "Placeholder.",
    image: ""
  },
  {
    id: "okeefe_site",
    title: "O'Keefe Ohlone Settlement",
    lat: 37.36523,
    lng: -122.11725,
    description: "Placeholder. In collaboration with Hidden Villa",
    image: ""
  },
  {
    id: "russian_ridge_bedrocks",
    title: "Russian Ridge Bedrocks",
    lat: 37.3153,
    lng: -122.1882,
    description: "Placeholder. In collaboration with Hidden Villa",
    image: ""
  },
  {
    id: "duveneck_house",
    title: "Duvenecks Part 3: The Duveneck House",
    lat: 37.35011,
    lng: -122.16298,
    description: "Part 3 in a series of sites celebrating the founders of Hidden Villa, the Duvenecks. Read preceding sites for complete narrative. The Duvenecks spent any spare time that they had outdoors. In their Ford Model T, they would cruise through the then-treacherous Santa Cruz mountains, camping on hillsides and in clearings. They had always dreamed of owning their own open space. In 1924, they found it on a routine drive down Moody Road. Spying the familiar metal flags as well as a 'for sale' sign, they were intrigued: they turned in, and discovered the thousand-acre lot that would serve both as their home and a setting for some of the Bay Area's most significant history: Hidden Villa. Amazed by its pristine, unblemished nature, the Duvenecks purchased the lot. They completed the Duveneck House in 1929, completed in a Spanish colonial style, and laden with intricate ironwork. In collaboration with Hidden Villa",
    image: ""
  },
  {
    id: "hv_hostel",
    title: "Hidden Villa Hostel",
    lat: 37.35055,
    lng: -122.16010,
    description: "Placeholder. In collaboration with Hidden Villa",
    image: ""
  },
  {
    id: "hostess_house",
    title: "Hostess House (now a restaurant)",
    lat: 37.4430264,
    lng: -122.1655246,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "downing_house",
    title: "The Downing House",
    lat: 37.44655,
    lng: -122.15673,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "bryant_house",
    title: "440-450 Bryant Street",
    lat: 37.4462943,
    lng: -122.1625154,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "ashby_house",
    title: "Ashby House",
    lat: 37.4530237,
    lng: -122.1480158,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "pa_post_office",
    title: "Old Palo Alto Post Office",
    lat: 37.4458095,
    lng: -122.1592599,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "church_residence",
    title: "St. Thomas Aquinas Church Residence",
    lat: 37.4451864,
    lng: -122.1569313,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "harbourmasters_house",
    title: "Harbourmaster's House",
    lat: 37.4575089,
    lng: -122.1075783,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "pa_first_hospital",
    title: "Palo Alto's First Hospital",
    lat: 37.4491051,
    lng: -122.1609048,
    description: "Placeholder. In collaboration with the Museum of American Heritage.",
    image: ""
  },
  {
    id: "professorville",
    title: "Professorville (geographical center)",
    lat: 37.44161,
    lng: -122.15413,
    description: "A historic neighbourhood featuring houses designed by various Stanford professors, opened in 1895. In collaboration with the Museum of American Heritage.",
    image: ""
  }
];
