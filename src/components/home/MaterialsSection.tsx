export function MaterialsSection() {
  return (
    <section className="skin-health fade-section" id="skin-health">
      <div className="label">Materials</div>
      <h2 className="display">
        What touches your skin <em>matters.</em>
      </h2>
      <div className="skin-health-grid">
        <div className="skin-col">
          <h3>No PFAS coatings</h3>
          <p>
            Forever chemicals have no place in fabric that touches your skin all day. Every Arya material is PFAS-free by design.
          </p>
        </div>
        <div className="skin-col">
          <h3>No toxic dyes</h3>
          <p>
            Conventional dye systems carry compounds that sit against your skin for hours. We refuse every one of them.
          </p>
        </div>
        <div className="skin-col">
          <h3>No virgin synthetics</h3>
          <p>
            Most athleisure is plastic. Petroleum-based fibers that trap heat, irritate skin, and shed microplastics in every wash. Not here.
          </p>
        </div>
      </div>
      <p className="skin-health-pull">
        The Arya Standard: if we would not wear it against our own skin, we will not make it.
      </p>
    </section>
  );
}
