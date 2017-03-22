function templateSkill (name, skill, colum) {
  return `
    <article class="skill col-xs-12 col-sm-6 row">
      <div class="skill_name col-xs-12">${name}</div>
      <div class="skill_percent col-xs-${colum}"></div>
    </article>
  `
}
