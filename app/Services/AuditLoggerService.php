<?php

namespace App\Services;

use App\Models\AccessHistoryLog;
use App\Models\User;

class AuditLoggerService
{
    public function log(User $user, string $actorType, string $actorName, string $action, ?string $resourceType = null, ?string $resourceId = null): AccessHistoryLog
    {
        return AccessHistoryLog::create([
            'user_id' => $user->id,
            'actor_type' => $actorType,
            'actor_name' => $actorName,
            'action' => $action,
            'resource_type' => $resourceType,
            'resource_id' => $resourceId,
            'ip_address' => request()->ip(),
        ]);
    }
}

