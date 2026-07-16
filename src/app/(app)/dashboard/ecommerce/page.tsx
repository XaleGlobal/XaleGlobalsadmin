"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  IconArrowUpRight,
  IconDownload,
  IconPlus,
  IconDotsVertical,
  IconRefresh,
  IconPhoto,
  IconReportAnalytics,
} from "@tabler/icons-react";

import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { RevenueAreaChart } from "@/components/charts/revenue-area-chart";
import { CategoryBarChart } from "@/components/charts/category-bar-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ecommerceStats, orders, topProducts } from "@/data";

function ChartMenu({ title }: { title: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <IconDotsVertical className="size-4" />
          <span className="sr-only">{title} options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onSelect={() =>
            toast.success(`${title} refreshed`, {
              description: "Showing the latest available data.",
            })
          }
        >
          <IconRefresh className="size-4" /> Refresh
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() =>
            toast.success("Chart exported", {
              description: `${title} was saved as a PNG image.`,
            })
          }
        >
          <IconPhoto className="size-4" /> Download PNG
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() =>
            toast("Opening full report", {
              description: `Preparing a detailed ${title.toLowerCase()} report.`,
            })
          }
        >
          <IconReportAnalytics className="size-4" /> View full report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const funnel = [
  { label: "Visits", value: 94271, pct: 100 },
  { label: "Product Views", value: 41800, pct: 44 },
  { label: "Add to Cart", value: 12640, pct: 13 },
  { label: "Checkout", value: 4820, pct: 5 },
  { label: "Purchase", value: 3210, pct: 3 },
];

export default function EcommercePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="E-Commerce"
        description="Store performance, sales and fulfilment at a glance."
      >
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            toast.success("Exported to CSV", {
              description: "Your store report is downloading.",
            })
          }
        >
          <IconDownload className="size-4" /> Export
        </Button>
        <Button size="sm" asChild>
          <Link href="/products/new">
            <IconPlus className="size-4" /> Add product
          </Link>
        </Button>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ecommerceStats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue &amp; Profit</CardTitle>
            <CardDescription>Monthly performance for the past year</CardDescription>
            <CardAction>
              <ChartMenu title="Revenue & Profit" />
            </CardAction>
          </CardHeader>
          <CardContent>
            <RevenueAreaChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Share of revenue this month</CardDescription>
          </CardHeader>
          <CardContent>
            <CategoryBarChart />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest transactions from your store</CardDescription>
            <CardAction>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/orders">
                  View all <IconArrowUpRight className="size-4" />
                </Link>
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.slice(0, 7).map((o) => (
                  <TableRow key={o.id}>
                    <TableCell className="pl-6 font-medium tabular-nums">
                      {o.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarImage src={o.avatar} alt={o.customer} />
                          <AvatarFallback>{o.customer.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="text-muted-foreground">{o.customer}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={o.status} />
                    </TableCell>
                    <TableCell className="pr-6 text-right font-medium tabular-nums">
                      ${o.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best sellers this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((p, i) => {
              const max = topProducts[0].sold;
              return (
                <div key={p.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium">
                      <span className="flex size-5 items-center justify-center rounded bg-muted text-xs text-muted-foreground">
                        {i + 1}
                      </span>
                      {p.name}
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {p.sold} sold
                    </span>
                  </div>
                  <Progress value={(p.sold / max) * 100} className="h-1.5" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Funnel</CardTitle>
          <CardDescription>
            From first visit to completed purchase this month
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {funnel.map((f) => (
            <div
              key={f.label}
              className="rounded-lg border bg-card p-4"
            >
              <p className="text-sm text-muted-foreground">{f.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                {f.value.toLocaleString()}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Progress value={f.pct} className="h-1.5" />
                <span className="text-xs text-muted-foreground tabular-nums">
                  {f.pct}%
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Paid: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    Pending: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    Refunded: "bg-slate-500/10 text-slate-600 dark:text-slate-400",
    Failed: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  };
  return (
    <Badge variant="secondary" className={map[status]}>
      {status}
    </Badge>
  );
}
