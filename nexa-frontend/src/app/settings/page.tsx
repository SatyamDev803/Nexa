// src/app/settings/page.tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/Header"
import { AIAssistantButton } from "@/components/ai-assistant-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Shield, Wallet, User, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useWallet } from "@/components/providers/AppProviders"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { isConnected, accountId } = useWallet()
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    rewards: true,
    security: true,
  })

  const [preferences, setPreferences] = useState({
    currency: "USD",
    language: "English",
    autoCompound: true,
    riskWarnings: true,
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and security settings.</p>
        </div>

        <div className="space-y-8">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" placeholder="Enter your username" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input id="bio" placeholder="Tell us about yourself..." />
              </div>
              <Button>Save Profile</Button>
            </CardContent>
          </Card>

          {/* Wallet Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Connected Wallet</div>
                  <div className="text-sm text-muted-foreground font-mono">
                    {isConnected && accountId ? accountId : "Not Connected"}
                  </div>
                </div>
                {isConnected ? (
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500 border-green-500/20">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="destructive">Disconnected</Badge>
                )}
              </div>
              <Separator />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
                  </div>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Transaction Signing</div>
                    <div className="text-sm text-muted-foreground">Require confirmation for all transactions</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Browser notifications</div>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Reward Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified when rewards are ready</div>
                </div>
                <Switch
                  checked={notifications.rewards}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, rewards: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Security Alerts</div>
                  <div className="text-sm text-muted-foreground">Important security notifications</div>
                </div>
                <Switch
                  checked={notifications.security}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, security: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Display Currency</Label>
                  <Select
                    value={preferences.currency}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, currency: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="BTC">BTC (₿)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences((prev) => ({ ...prev, language: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Español</SelectItem>
                      <SelectItem value="French">Français</SelectItem>
                      <SelectItem value="German">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">Choose your preferred theme</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Auto-Compound Rewards</div>
                  <div className="text-sm text-muted-foreground">Automatically reinvest rewards</div>
                </div>
                <Switch
                  checked={preferences.autoCompound}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, autoCompound: checked }))}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Risk Warnings</div>
                  <div className="text-sm text-muted-foreground">Show risk warnings before transactions</div>
                </div>
                <Switch
                  checked={preferences.riskWarnings}
                  onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, riskWarnings: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-red-500">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">Download all your account data</div>
                </div>
                <Button variant="outline">Export</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Delete Account</div>
                  <div className="text-sm text-muted-foreground">Permanently delete your account and data</div>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <AIAssistantButton />
    </div>
  )
}