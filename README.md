# EduPulse - Modern Education Management System (EMS)

A modern, responsive, and full-featured **Education Management System** built with **React.js**, **Vite**, **Tailwind CSS**, and **React Router**.

---

## 🌟 Key Features

* **Role-Based Access Control (RBAC)**:
  * **Admin**: Super administrator with full access to all 18 modules, directory CRUD, financials, settings, and school-wide reports.
  * **Teacher**: Dedicated faculty portal to manage classes, mark roll-call attendance, enter grades, issue coursework assignments, and manage timetables.
  * **Student**: Personal student dashboard to inspect timetables, view official grade report cards, submit assignments, and track library book loans.
  * **Parent**: Guardian portal to track attendance status, view fee invoices, download report cards, and communicate with instructors.
  * **Instant 1-Click Role Switcher**: Switch between demo roles instantly directly from the top header or the login screen.
* **18 Complete Functional Modules**:
  1. **Dashboard**: Interactive KPIs, weekly attendance area chart, subject grade averages bar chart, fee collection donut chart, quick actions, bulletin notices, and campus events.
  2. **Students**: Directory with avatar, roll number, class filter, gender, status badges, profile viewer modal, and full CRUD.
  3. **Teachers**: Faculty directory, department filter, qualifications, experience, and assigned subjects.
  4. **Parents**: Guardian directory, linked children, occupation, address, and emergency phone lines.
  5. **Classes**: Grade levels, sections, class teacher advisors, room numbers, and seating capacities with progress bars.
  6. **Subjects**: Academic curriculum courses, subject codes, assigned instructors, and credit hours.
  7. **Attendance**: Daily roll-call sheet by class and date with instant status toggles (Present, Absent, Late, Excused), bulk marking, and attendance metrics.
  8. **Timetable**: Weekly schedule matrix (Monday to Friday, periods 1 to 6) with slot editing modal and print support.
  9. **Exams**: Assessment schedule manager with academic terms, date windows, and participating classes.
  10. **Results**: Student mark entry with auto-computed total, percentage, GPA, grade letter, and an **official printable Report Card modal**.
  11. **Assignments**: Coursework manager with due dates, maximum scores, submission counters, and active/closed status.
  12. **Fees**: Invoice tracker, fee category breakdown, payment collection modal, and **official printable fee receipt generation**.
  13. **Library**: Book catalog, available copy tracker, shelf rack locations, student loan issuance, and return management.
  14. **Notices**: School announcement bulletin board with audience tags (All, Teachers, Students, Parents) and pinned status.
  15. **Events**: Campus events calendar with date badges, venue, timing, and category tags (Sports, Cultural, Academic, etc.).
  16. **Messages**: Multi-thread communication center with active conversation history and instant reply simulation.
  17. **Reports**: Cross-departmental analytics hub with attendance trends, grade mastery distribution, fiscal ratios, honors roll, and CSV export.
  18. **Settings**: School profile, academic sessions, theme toggle, and **Factory Reset** to safely restore sample data anytime.
* **LocalStorage Persistence**: All additions, modifications, deletions, payment collections, attendance logs, and settings persist across page reloads without requiring an external backend.
* **Responsive & Themed**: Clean Light & Dark mode support with Tailwind's `dark` class, mobile sliding drawer, and desktop collapsible sidebar.

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: v18.0 or higher
* **npm**: v9.0 or higher

### Installation & Run

1. Navigate to the project directory:
   ```bash
   cd education-management-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

### Production Build
To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 👥 Demo Logins (1-Click Switcher Available)

| Persona | Name | Role | Email |
| :--- | :--- | :--- | :--- |
| **Admin** | Dr. Evelyn Brooks | `admin` | `admin@school.edu` |
| **Teacher** | Sarah Jenkins | `teacher` | `teacher@school.edu` |
| **Student** | Alexander Hayes | `student` | `student@school.edu` |
| **Parent** | Thomas Hayes | `parent` | `parent@school.edu` |

*(You can also click any demo card directly on the login page or use the role switcher in the top navigation bar).*

---

## 📁 Project Structure

```
education-management-system/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Router & route guards
│   ├── index.css                 # Tailwind directives & print styles
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state, RBAC, and demo personas
│   │   ├── ThemeContext.jsx      # Dark / Light mode provider
│   │   └── ToastContext.jsx      # Floating notification toast provider
│   ├── services/
│   │   ├── initialData.js        # Seed database for all 18 modules
│   │   └── storageService.js     # LocalStorage CRUD and business logic
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx        # Search, theme toggle, role switcher, profile
│   │   │   ├── Sidebar.jsx       # Responsive drawer with role-filtered links
│   │   │   └── Layout.jsx        # Shell wrapper
│   │   └── common/
│   │       ├── DataTable.jsx     # Search, filter, column sort, pagination, CSV export
│   │       ├── Modal.jsx         # Accessible modal dialog
│   │       ├── ConfirmDialog.jsx # Confirmation alert modal
│   │       ├── FormField.jsx     # Text, select, textarea with live validation
│   │       ├── StatCard.jsx      # Metric summary card
│   │       ├── Badge.jsx         # Status pill badges
│   │       ├── Button.jsx        # Styled variant buttons
│   │       └── Charts.jsx        # Pure SVG Area, Bar, and Donut charts
│   └── pages/
│       ├── Login.jsx             # Auth page with 1-click demo role selector
│       ├── Dashboard.jsx         # Main analytics & shortcuts dashboard
│       ├── Students.jsx          # Student management & profile viewer
│       ├── Teachers.jsx          # Faculty & subject assignments
│       ├── Parents.jsx           # Parent directory & child associations
│       ├── Classes.jsx           # Grade divisions, sections & advisors
│       ├── Subjects.jsx          # Curriculum courses & credit hours
│       ├── Attendance.jsx        # Daily roll-call marking sheet
│       ├── Timetable.jsx         # Weekly timetable matrix & period editor
│       ├── Exams.jsx             # Assessment scheduling
│       ├── Results.jsx           # Grades, GPAs & printable Report Card
│       ├── Assignments.jsx       # Coursework tasks & submission progress
│       ├── Fees.jsx              # Invoices, payment collection & receipts
│       ├── Library.jsx           # Book catalog, loans & returns
│       ├── Notices.jsx           # School circular bulletin board
│       ├── Events.jsx            # Campus events calendar
│       ├── Messages.jsx          # Two-pane messaging simulation
│       ├── Reports.jsx           # Multi-department analytics & CSV export
│       └── Settings.jsx          # Institutional configuration & data reset
```
