from fastapi import APIRouter

router = APIRouter()


@router.get("/ping", summary="Application heartbeat")
async def ping() -> dict[str, str]:
    """Return a simple pong response for readiness checks."""
    return {"message": "pong"}
