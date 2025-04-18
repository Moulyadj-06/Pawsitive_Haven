// routes/adoptPetRequests.js

const express = require("express");
const router = express.Router();
const AdoptionRequest = require("../models/AdoptionRequest");
const sendEmail = require("../utils/sendEmail");

// PUT /api/adoptPetRequests/bulk-update
router.put("/bulk-update", async (req, res) => {
  const { ids, status } = req.body;

  if (!Array.isArray(ids) || !status) {
    return res.status(400).json({ error: "Missing ids or status" });
  }

  try {
    // Find the adoption requests that match the provided ids
    const requestsToUpdate = await AdoptionRequest.find({ _id: { $in: ids } });

    // Update the status of the adoption requests
    await AdoptionRequest.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } }
    );

    // Send email to each adopter
    requestsToUpdate.forEach((request) => {
      const subject = `Adoption Request ${status}`;
      const text = `
        Hi ${request.name},

        Your request to adopt ${request.petName} has been ${status}!

        ${status === "Accepted"
          ? "We will contact you soon to discuss the next steps."
          : "We are sorry, but your adoption request was not accepted. Please feel free to explore other pets available for adoption."}

        Thank you for your interest in adopting!

        Best regards,
        The Pet Adoption Team
      `;

      // Use the sendEmail function to send the email to the adopter
      sendEmail(request.email, subject, text)
        .then(() => console.log(`Email sent to ${request.name}`))
        .catch((error) => console.error(`Error sending email to ${request.name}:`, error));
    });

    res.status(200).json({ message: "Bulk status updated and emails sent." });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ error: "Server error during bulk update." });
  }
});

module.exports = router;
