# Order Risk Dashboard

A modern SaaS dashboard for monitoring potentially risky COD (Cash on Delivery) orders, built on top of [shadcn-admin](https://github.com/satnaing/shadcn-admin).

## Setup Instructions

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
git clone https://github.com/Rhythm-Aphale/codking-shadcn.git
cd codking-shadcn
pnpm install
pnpm dev
```

### Available Scripts

| Command        | Description                         |
| -------------- | ----------------------------------- |
| `pnpm dev`     | Start development server            |
| `pnpm build`   | Type check and build for production |
| `pnpm lint`    | Run ESLint                          |
| `pnpm format`  | Format code with Prettier           |
| `pnpm preview` | Preview production build            |

## Architecture Overview

### Project Structure

The project follows a feature-based architecture. The Order Risk Dashboard is implemented as a self-contained feature module:

```
src/
├── features/order-risk/
│   ├── index.tsx                  # Main page component
│   ├── components/
│   │   ├── summary-cards.tsx      # Analytics metric cards
│   │   ├── orders-table.tsx       # Data table with filters
│   │   ├── orders-columns.tsx     # Table column definitions
│   │   ├── order-detail-drawer.tsx # Side drawer with actions
│   │   └── risk-charts.tsx        # Recharts visualizations
│   └── data/
│       ├── schema.ts              # Zod schema, types, risk calculation
│       ├── data.tsx               # Filter options with icons
│       └── orders-api.ts          # API fetch + data enrichment
├── routes/_authenticated/order-risk/
│   └── index.tsx                  # TanStack Router route definition
└── components/layout/data/
    └── sidebar-data.ts            # Sidebar navigation (modified)
```

### Data Flow

1. **Fetch** - `orders-api.ts` fetches from mock API using axios
2. **Validate** - Each order is validated with zod schema
3. **Enrich** - `enrichOrder()` computes `risk_score` and `risk_level` per order
4. **Cache** - React Query (`useQuery`) caches the enriched data
5. **Display** - Components receive `OrderWithRisk[]` as props

### Risk Score Calculation

```
risk_score = (cod_orders / total_orders) * 100
```

| Score   | Level       |
| ------- | ----------- |
| > 70    | High Risk   |
| 40 - 70 | Medium Risk |
| < 40    | Safe        |

### Key Patterns

- **File-based routing** via TanStack Router with auto-generated route tree
- **URL-synced table state** using the project's `useTableUrlState` hook for search, filters, and pagination
- **Feature isolation** - all order-risk code lives in `src/features/order-risk/`
- **Reusable shared components** - `DataTableToolbar`, `DataTablePagination`, `DataTableColumnHeader` from `src/components/data-table/`
- **Theme-aware colors** - charts use CSS variables (`--chart-1` to `--chart-5`) that adapt to light/dark mode

## Libraries Used

All libraries were already included in the base project. No additional dependencies were installed.

| Library               | Usage                                                   |
| --------------------- | ------------------------------------------------------- |
| React 19 + TypeScript | UI framework                                            |
| TanStack Router       | File-based routing with search param validation         |
| TanStack React Table  | Headless data table with sorting, filtering, pagination |
| TanStack React Query  | Data fetching and caching                               |
| shadcn/ui + Radix UI  | UI components (Card, Badge, Sheet, Table, Button, etc.) |
| Recharts              | Pie charts and bar charts                               |
| Tailwind CSS v4       | Utility-first styling                                   |
| Zod                   | Schema validation for API data and route search params  |
| Axios                 | HTTP client for mock API                                |
| Sonner                | Toast notifications                                     |
| Lucide React          | Icons                                                   |

## Assumptions Made

- **Risk score is per-customer, not per-order** - The formula uses the customer's `cod_orders / total_orders` ratio, meaning all orders from the same customer may share a similar risk profile
- **Actions are UI-only** - Send OTP, Force Prepaid, and Mark Safe buttons update local state and show toast notifications without making API calls
- **City filter is dynamic** - City options are derived from the fetched data rather than hardcoded, so they adapt to the dataset
- **No authentication required** - The dashboard uses the base project's existing auth layout without implementing actual login
- **Mock API is stable** - The Shopify CDN endpoint is expected to return consistent data structure

## Features Implemented

### Required

- Dashboard page with sidebar navigation
- Summary cards (Total Orders, High Risk Orders, COD Percentage)
- Orders data table with all required columns
- Risk score calculation with colored status badges
- Search, sorting, filtering (city, order status, risk level), and pagination
- Order details side drawer with customer info and risk explanation
- Action buttons (Send OTP, Force Prepaid, Mark Safe)
- Charts (COD vs Prepaid, Risk Distribution, Orders by City)

### Bonus

- Loading skeletons for cards, charts, and table
- Mobile responsive layout
- Empty states when no results match filters
- URL-based filters (shareable, bookmarkable, survives page refresh)
- Optimistic UI updates with toast notifications on actions

---

## Base Project

# Shadcn Admin Dashboard

Admin Dashboard UI crafted with Shadcn and Vite. Built with responsiveness and accessibility in mind.

![alt text](public/images/shadcn-admin.png)

[![Sponsored by Clerk](https://img.shields.io/badge/Sponsored%20by-Clerk-5b6ee1?logo=clerk)](https://go.clerk.com/GttUAaK)

## Features

- Light/dark mode
- Responsive
- Accessible
- With built-in Sidebar component
- Global search command
- 10+ pages
- Extra custom components
- RTL support

<details>
<summary>Customized Components (click to expand)</summary>

This project uses Shadcn UI components, but some have been slightly modified for better RTL (Right-to-Left) support and other improvements. These customized components differ from the original Shadcn UI versions.

If you want to update components using the Shadcn CLI (e.g., `npx shadcn@latest add <component>`), it's generally safe for non-customized components. For the listed customized ones, you may need to manually merge changes to preserve the project's modifications and avoid overwriting RTL support or other updates.

> If you don't require RTL support, you can safely update the 'RTL Updated Components' via the Shadcn CLI, as these changes are primarily for RTL compatibility. The 'Modified Components' may have other customizations to consider.

### Modified Components

- scroll-area
- sonner
- separator

### RTL Updated Components

- alert-dialog
- calendar
- command
- dialog
- dropdown-menu
- select
- table
- sheet
- sidebar
- switch

**Notes:**

- **Modified Components**: These have general updates, potentially including RTL adjustments.
- **RTL Updated Components**: These have specific changes for RTL language support (e.g., layout, positioning).
- For implementation details, check the source files in `src/components/ui/`.
- All other Shadcn UI components in the project are standard and can be safely updated via the CLI.

</details>

## Tech Stack

**UI:** [ShadcnUI](https://ui.shadcn.com) (TailwindCSS + RadixUI)

**Build Tool:** [Vite](https://vitejs.dev/)

**Routing:** [TanStack Router](https://tanstack.com/router/latest)

**Type Checking:** [TypeScript](https://www.typescriptlang.org/)

**Linting/Formatting:** [ESLint](https://eslint.org/) & [Prettier](https://prettier.io/)

**Icons:** [Lucide Icons](https://lucide.dev/icons/), [Tabler Icons](https://tabler.io/icons) (Brand icons only)

**Auth (partial):** [Clerk](https://go.clerk.com/GttUAaK)

## Run Locally

Clone the project

```bash
  git clone https://github.com/satnaing/shadcn-admin.git
```

Go to the project directory

```bash
  cd shadcn-admin
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm run dev
```

## Sponsoring this project ❤️

If you find this project helpful or use this in your own work, consider [sponsoring me](https://github.com/sponsors/satnaing) to support development and maintenance. You can [buy me a coffee](https://buymeacoffee.com/satnaing) as well. Don’t worry, every penny helps. Thank you! 🙏

For questions or sponsorship inquiries, feel free to reach out at [satnaingdev@gmail.com](mailto:satnaingdev@gmail.com).

### Current Sponsor

- [Clerk](https://go.clerk.com/GttUAaK) - authentication and user management for the modern web

## Author

Crafted with 🤍 by [@satnaing](https://github.com/satnaing)

## License

Licensed under the [MIT License](https://choosealicense.com/licenses/mit/)
