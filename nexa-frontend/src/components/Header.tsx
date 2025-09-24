// src/components/Header.tsx
"use client"

import { useState, type ElementType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { ConnectWallet } from "@/components/ConnectWallet"
import { LayoutDashboard, Coins, TrendingUp, Activity, Gift, Settings, Menu, X, PieChart } from "lucide-react"

type NavLink = {
  name: string;
  href: string;
  icon?: ElementType;
};

const mainNavLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Pools", href: "/pools" },
  { name: "Staking", href: "/staking" },
  { name: "Dashboard", href: "/dashboard" },
]

const dashboardNavLinks: NavLink[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Pools", href: "/pools", icon: Coins },
  { name: "Staking", href: "/staking", icon: TrendingUp },
  { name: "Portfolio", href: "/portfolio", icon: PieChart },
  { name: "Activity", href: "/activity", icon: Activity },
  { name: "Rewards", href: "/rewards", icon: Gift },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const isDashboardPage = [
    '/dashboard', '/pools', '/staking', '/portfolio', 
    '/activity', '/rewards', '/settings'
  ].some(path => pathname.startsWith(path));

  const navLinks = isDashboardPage ? dashboardNavLinks : mainNavLinks;

  return (
    <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">N</span>
            </div>
            <span className="text-xl font-bold">Nexa</span>
          </Link>

          {/* CHANGED md:flex to lg:flex */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.name}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="hidden sm:flex">
              <ConnectWallet />
            </div>
            {/* CHANGED md:hidden to lg:hidden */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          // CHANGED md:hidden to lg:hidden
          <nav className="lg:hidden mt-4 pb-4 border-t border-border/40 pt-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                    {item.name}
                  </Link>
                )
              })}
              <div className="mt-2 border-t pt-4">
                <ConnectWallet />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}