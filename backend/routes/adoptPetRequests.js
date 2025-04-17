// routes/adoptPetRequests.js

const express = require("express");
const router = express.Router();
const AdoptionRequest = require("../models/AdoptionRequest");
const transporter = require("../utils/sendEmail");

// PUT /api/adoptPetRequests/bulk-update
router.put("/bulk-update", async (req, res) => {
  const { ids, status } = req.body;

  if (!Array.isArray(ids) || !status) {
    return res.status(400).json({ error: "Missing ids or status" });
  }

  try {
    const requestsToUpdate = await AdoptionRequest.find({ _id: { $in: ids } });

    await AdoptionRequest.updateMany(
      { _id: { $in: ids } },
      { $set: { status: status } }
    );

    // Send emails
    requestsToUpdate.forEach((request) => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: request.email,
        subject: `Adoption Request ${status}`,
        html: `
          <p>Dear ${request.name},</p>
          <p>Your adoption request for <strong>${request.petName}</strong> (${request.petType}) has been <strong>${status}</strong>.</p>
          ${
            status === "Accepted"
              ? "<p>We will reach out to you shortly for the next steps!</p>"
              : "<p>Thank you for your interest. We hope to assist you again in the future.</p>"
          }
          <br/>
          <p>Warm regards,<br/>Pet Adoption Team</p>
        `,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email sending error for:", request.email, error);
        } else {
          console.log("Email sent to:", request.email);
        }
      });
    });

    res.status(200).json({ message: "Bulk status updated and emails sent." });
  } catch (err) {
    console.error("Bulk update error:", err);
    res.status(500).json({ error: "Server error during bulk update." });
  }
});

module.exports = router;
