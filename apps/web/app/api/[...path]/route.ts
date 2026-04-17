import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const upstreamBaseRaw =
    process.env.API_BASE_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim() ||
    "http://localhost:8000";
const upstreamBase = upstreamBaseRaw.replace(/\/+$/, "");

const HOP_BY_HOP_HEADERS = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
]);

type RouteContext = {
    params: {
        path?: string[];
    };
};

function buildUpstreamUrl(pathParts: string[] | undefined, search: string): string {
    const path = (pathParts ?? []).join("/");
    return `${upstreamBase}/${path}${search}`;
}

function buildForwardHeaders(request: NextRequest): Headers {
    const headers = new Headers();
    request.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (HOP_BY_HOP_HEADERS.has(lowerKey) || lowerKey === "host") {
            return;
        }
        headers.set(key, value);
    });
    return headers;
}

async function proxyToUpstream(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    const targetUrl = buildUpstreamUrl(context.params.path, request.nextUrl.search);
    const method = request.method.toUpperCase();
    const hasBody = method !== "GET" && method !== "HEAD";

    let upstreamResponse: Response;
    try {
        upstreamResponse = await fetch(targetUrl, {
            method,
            headers: buildForwardHeaders(request),
            body: hasBody ? await request.arrayBuffer() : undefined,
            redirect: "manual",
            cache: "no-store",
        });
    } catch {
        return NextResponse.json(
            {
                error: "BadGateway",
                detail: "Could not reach upstream API service.",
            },
            { status: 502 },
        );
    }

    const responseHeaders = new Headers();
    upstreamResponse.headers.forEach((value, key) => {
        const lowerKey = key.toLowerCase();
        if (HOP_BY_HOP_HEADERS.has(lowerKey) || lowerKey === "set-cookie") {
            return;
        }
        responseHeaders.append(key, value);
    });

    const headersWithOptionalGetSetCookie = upstreamResponse.headers as Headers & {
        getSetCookie?: () => string[];
    };
    if (typeof headersWithOptionalGetSetCookie.getSetCookie === "function") {
        for (const cookie of headersWithOptionalGetSetCookie.getSetCookie()) {
            responseHeaders.append("set-cookie", cookie);
        }
    } else {
        const cookie = upstreamResponse.headers.get("set-cookie");
        if (cookie) {
            responseHeaders.set("set-cookie", cookie);
        }
    }

    return new NextResponse(upstreamResponse.body, {
        status: upstreamResponse.status,
        headers: responseHeaders,
    });
}

export async function GET(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}

export async function POST(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}

export async function OPTIONS(request: NextRequest, context: RouteContext): Promise<NextResponse> {
    return proxyToUpstream(request, context);
}
