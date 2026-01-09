# Interactive Map MUN - UNODC Drug Trafficking in Latin America

An interactive web-based map for Model United Nations (MUN) competition focused on UNODC Drug Trafficking in Latin America.

## Features

- 🗺️ Interactive map of Latin America with clickable countries
- 🎨 Color-coded by role: Producer (red), Transit (orange), Mixed (yellow), Consumer (blue)
- 📊 Detailed country panels with statistics, UNODC programs, and criminal organizations
- 📱 Responsive design for desktop and tablet
- ⚡ Fast loading with static data

## Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 14+ (App Router)
- **Map Library**: react-simple-maps
- **Styling**: TailwindCSS
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) installed

### Installation
```bash
# Clone the repository
git clone https://github.com/gabi0632/interactive-map-mun.git
cd interactive-map-mun

# Install dependencies
bun install

# Start development server
bun dev
```

### Build
```bash
bun run build
```

### Deploy
```bash
vercel
```

## Project Structure

```
interactive-map-mun/
├── src/
│   ├── app/                    # Next.js App Router
│   ├── components/
│   │   ├── Map/                # Map components
│   │   ├── CountryPanel/       # Country info panel
│   │   └── UI/                 # Shared UI components
│   ├── data/countries/         # Country JSON data
│   ├── types/                  # TypeScript types
│   └── lib/                    # Utilities
├── public/geo/                 # GeoJSON map data
├── .claude/                    # Claude Code configuration
│   ├── tasks/                  # Task definitions
│   ├── agents/                 # Sub-agent configurations
│   └── skills/                 # Custom skills
└── PRD.md                      # Product Requirements Document
```

## Countries Included

### Producer Countries (Red)
- Colombia, Peru, Bolivia

### Transit Countries (Orange)
- Mexico, Guatemala, Honduras, El Salvador, Nicaragua, Costa Rica, Panama

### Mixed Role (Yellow)
- Ecuador, Venezuela, Brazil

### Consumer Markets (Blue)
- United States, Canada

## Development with Claude Code

This project uses Claude Code with custom agents and skills:

### Available Agents
- `project-setup` - Initialize project infrastructure
- `type-architect` - TypeScript type definitions
- `map-developer` - Map component development
- `ui-developer` - UI component development
- `data-compiler` - Country data compilation
- `ui-tester` - Visual verification
- `test-runner` - Test execution
- `code-reviewer` - Code quality review
- `git-manager` - Git operations

### Task Execution
See `.claude/tasks/mun-interactive-map/README.md` for detailed task breakdown and execution guide.

## License

MIT

## Acknowledgments

- UNODC for drug trafficking data
- Natural Earth for geographic data
- React Simple Maps for the map library
