const Player = (name) => {
  let health = 20;
  const damage = (enemy) => {
    enemy.health = enemy.health - 1;
    console.log(enemy.health);
  };
  return { health, name, damage };
};

const bruh = Player("bruh");
const bruh2 = Player("bruh2");

bruh.damage(bruh2);
bruh.damage(bruh2);
bruh.damage(bruh2);
bruh.damage(bruh2);
