const root = document.documentElement;
const tabs = [...document.querySelectorAll("[data-component]")];
const panels = [...document.querySelectorAll("[data-panel]")];
const intensity = document.querySelector("#intensity");
const opacity = document.querySelector("#opacity");
const radius = document.querySelector("#radius");
const blurValue = document.querySelector("#blurValue");
const alphaValue = document.querySelector("#alphaValue");
const radiusValue = document.querySelector("#radiusValue");
const codeBlock = document.querySelector("#codeBlock");
const copyCode = document.querySelector("#copyCode");
const switchControl = document.querySelector("#switchControl");

const snippets = {
  blur: () => `<BlurView intensity={${intensity.value}} tint="dark" radius={${radius.value}}>
  <GlassPanel opacity={${(opacity.value / 100).toFixed(2)}}>
    Frosted surface
  </GlassPanel>
</BlurView>`,
  progressive: () => `<ProgressiveBlurView
  intensity={[8, 14, 20, 28, 36]}
  direction="bottom"
  height={116}
/>`,
  liquid: () => `<LiquidGlassView radius={20} highlight="top">
  <Button variant="liquid">Liquid action</Button>
</LiquidGlassView>`,
  switch: () => `<BlurSwitch
  value={enabled}
  tint="aqua"
  onValueChange={setEnabled}
/>`
};

function setComponent(name) {
  tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.component === name));
  panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === name));
  codeBlock.textContent = snippets[name]();
}

function updateControls() {
  const blur = `${intensity.value}px`;
  const alpha = Number(opacity.value) / 100;
  const rounded = `${radius.value}px`;
  root.style.setProperty("--blur", blur);
  root.style.setProperty("--panel-alpha", alpha);
  root.style.setProperty("--radius", rounded);
  blurValue.textContent = blur;
  alphaValue.textContent = `${opacity.value}%`;
  radiusValue.textContent = rounded;
  const active = document.querySelector(".component-tabs .is-active")?.dataset.component || "blur";
  codeBlock.textContent = snippets[active]();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setComponent(tab.dataset.component));
});

[intensity, opacity, radius].forEach((input) => {
  input.addEventListener("input", updateControls);
});

document.querySelectorAll(".glass-panel, .preview-card").forEach((panel) => {
  panel.addEventListener("pointermove", (event) => {
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    panel.style.setProperty("--my", `${event.clientY - rect.top}px`);
  });
});

switchControl.addEventListener("click", () => {
  const on = !switchControl.classList.contains("is-on");
  switchControl.classList.toggle("is-on", on);
  switchControl.setAttribute("aria-pressed", String(on));
});

copyCode.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(codeBlock.textContent);
    copyCode.textContent = "Copied";
  } catch {
    copyCode.textContent = "Select code";
  }
  window.setTimeout(() => {
    copyCode.textContent = "Copy";
  }, 1200);
});

updateControls();
