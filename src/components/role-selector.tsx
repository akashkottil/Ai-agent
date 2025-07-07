"use client";

import type { Role } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSelectorProps {
  roles: Role[];
  selectedRole: string;
  onRoleChange: (role: string) => void;
}

export function RoleSelector({ roles, selectedRole, onRoleChange }: RoleSelectorProps) {
  const SelectedIcon = roles.find(r => r.value === selectedRole)?.icon;

  return (
    <Select value={selectedRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-[220px] h-10">
        <div className="flex items-center gap-2 overflow-hidden">
            {SelectedIcon && <SelectedIcon className="h-4 w-4 shrink-0" />}
            <SelectValue placeholder="Select a role" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.value} value={role.value}>
            <div className="flex items-center gap-3">
              <role.icon className="h-5 w-5 text-muted-foreground" />
              <span>{role.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
