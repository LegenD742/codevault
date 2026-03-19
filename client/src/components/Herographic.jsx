// HeroGraphic.jsx
const Herographic = () => (
  <svg width="500" height="300" viewBox="0 0 500 300" fill="none">
    
    {/* Background glow */}
    <rect width="500" height="300" rx="20" fill="#0B132B"/>

    {/* Floating cards */}
    <rect x="50" y="60" width="120" height="80" rx="10" fill="#1C2541" stroke="#3A86FF"/>
    <rect x="200" y="40" width="140" height="90" rx="10" fill="#1C2541" stroke="#00D1FF"/>
    <rect x="370" y="80" width="100" height="70" rx="10" fill="#1C2541" stroke="#3A86FF"/>

    {/* Code lines */}
    <text x="60" y="90" fill="#00D1FF" fontSize="12" fontFamily="monospace">
      const x = 10;
    </text>

    <text x="210" y="80" fill="#3A86FF" fontSize="12" fontFamily="monospace">
      function save() {"{"}
    </text>

    <text x="210" y="100" fill="#00D1FF" fontSize="12" fontFamily="monospace">
      return vault;
    </text>

    <text x="380" y="110" fill="#00D1FF" fontSize="12" fontFamily="monospace">
      {"{}"}
    </text>

    {/* Title */}
    <text x="140" y="250" fill="#3A86FF" fontSize="24" fontWeight="bold">
      Store. Organize. Code.
    </text>

  </svg>
);

export default Herographic;