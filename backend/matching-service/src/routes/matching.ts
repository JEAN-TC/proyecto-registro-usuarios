import { Router, Request, Response } from 'express';
import 'dotenv/config';
import authMiddleware from '../middleware/auth';
import prisma from '../prisma';

// Define a custom interface that extends Express's Request
interface AuthRequest extends Request {
  userId?: string; // Add the optional userId property
}

const router = Router();

// Swipe on a user
router.post('/swipe', authMiddleware, async (req: AuthRequest, res: Response) => {
  const { swipedId, liked }: { swipedId: string; liked: boolean } = req.body;
  const swiperId = req.userId; // From authMiddleware

  if (!swiperId || !swipedId || typeof liked !== 'boolean') {
    return res.status(400).json({ error: 'Invalid swipe data.' });
  }

  if (swiperId === swipedId) {
    return res.status(400).json({ error: 'Cannot swipe on yourself.' });
  }

  try {
    // Record the swipe
    await prisma.swipe.upsert({
      where: {
        swiperId_swipedId: {
          swiperId: swiperId,
          swipedId: swipedId,
        },
      },
      update: { liked: liked },
      create: {
        swiperId,
        swipedId,
        liked,
      },
    });

    if (liked) {
      // Check for a mutual like (a match)
      const mutualSwipe = await prisma.swipe.findUnique({
        where: {
          swiperId_swipedId: {
            swiperId: swipedId,
            swipedId: swiperId,
          },
        },
      });

      if (mutualSwipe && mutualSwipe.liked) {
        // Mutual like found, create a match
        const match = await prisma.match.create({
          data: {
            user1: { connect: { id: swiperId } },
            user2: { connect: { id: swipedId } },
          },
        });
        return res.status(200).json({ message: 'Match! You both liked each other.', matchId: match.id });
      }
    }

    res.status(200).json({ message: liked ? 'Liked!' : 'Disliked.' });
  } catch (error: any) {
    // P2002 is for unique constraint violation, which upsert handles.
    // We keep the generic error handler for other potential issues.
    console.error(error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;

