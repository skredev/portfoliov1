"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Clock from 'react-live-clock';
import { Button } from "@/components/ui/button";

export function Information(){
    return(
    <Card>
        <CardHeader>
            <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid gap-3">
                <Button variant="outline">
                    <Clock
                    format={'HH:mm:ss'}
                    ticking={true} />
                </Button>
                <Button variant="outline">
                    <Clock
                    format={'DD.MM.YYYY'}
                    ticking={true} />
                </Button>
            </div>
        </CardContent>
    </Card>
    )
}