# Bridal regalia builder (/regalia)

The customer builds a bride, groom or couple look piece by piece (crown or cap, neck piece, wrist beads, attire), sees it on an illustrated figure, and gets a **price range** for each piece and for the set. Buy or rent: beads can be rented, attire is made to measure and kept. "Enquire about this set" opens the group n8n form with the set, the plan and the range written into the message, and leaves the event date for the customer to add.

- `pieces.ts`: the pieces, price ranges and the Enquire message. Edit prices here.
- `art.ts`: bead art. Crowns and necklaces are the try-on's concept designs; the cap and wrist beads are drawn here with the same bead.
- `Figure.tsx`: the illustrated figure that wears the pieces.
- `Builder.tsx`: the page.

Rules: price ranges only (C3). Never show or promise a ready date (C1): the page only says custom sets usually take 2 to 3 weeks and that the workshop confirms the date.
