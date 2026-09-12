/**
 * Every icon the docs site uses, in one place, so changing icon library is one
 * edit rather than twenty-one.
 *
 * Registry components are deliberately not here. They ship verbatim into
 * someone else's project, where `@/icons` does not resolve, so each one
 * imports from `iconoir-react` directly. `tests/icons.test.ts` holds both
 * halves of that rule.
 */

export {
  ArrowUpRight,
  BellNotification,
  Bold,
  Bookmark,
  Check,
  CheckCircle,
  ComponentSolid,
  Copy,
  CursorPointer,
  Folder,
  Github,
  HalfMoon,
  Heart,
  InfoCircle,
  InputField,
  Italic,
  LogOut,
  LongArrowDownLeftSolid,
  Mail,
  Menu,
  MouseButtonLeft,
  MouseButtonRight,
  MouseScrollWheel,
  NavArrowDown,
  NavArrowLeft,
  NavArrowRight,
  NavArrowUp,
  OpenBook,
  OpenSelectHandGesture,
  Page,
  PageEdit,
  PagePlus,
  PageSearch,
  Plus,
  RssFeed,
  Ruler,
  RulerCombine,
  Search,
  Sparks,
  SparksSolid,
  Star,
  StatUp,
  StyleBorderSolid,
  SunLight,
  Trash,
  TriangleFlag,
  Underline,
  User,
  UserPlus,
  WarningTriangle,
  Wrench,
  Xmark,
} from "iconoir-react";
