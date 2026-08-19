import test from "node:test";
import assert from "node:assert/strict";
import { getFixedMenuPosition } from "./portalMenuPositionHelpers";

const viewport = { width: 1000, height: 800 };

test("getFixedMenuPosition places the menu below the trigger when there is room", () => {
  const pos = getFixedMenuPosition({
    trigger: { top: 100, left: 200, right: 360, bottom: 136, width: 160, height: 36 },
    menu: { width: 160, height: 120 },
    viewport,
    align: "stretch",
  });
  assert.equal(pos.openAbove, false);
  assert.equal(pos.top, 140);
  assert.equal(pos.left, 200);
  assert.equal(pos.width, 160);
});

test("getFixedMenuPosition flips above when there is not enough room below", () => {
  const pos = getFixedMenuPosition({
    trigger: { top: 700, left: 200, right: 360, bottom: 736, width: 160, height: 36 },
    menu: { width: 160, height: 120 },
    viewport,
    align: "stretch",
  });
  assert.equal(pos.openAbove, true);
  assert.equal(pos.top, 700 - 4 - 120);
});

test("getFixedMenuPosition right-aligns to the trigger", () => {
  const pos = getFixedMenuPosition({
    trigger: { top: 100, left: 800, right: 840, bottom: 136, width: 40, height: 36 },
    menu: { width: 160, height: 80 },
    viewport,
    align: "right",
  });
  assert.equal(pos.left, 840 - 160);
  assert.equal(pos.width, undefined);
});

test("getFixedMenuPosition honors preferredPlacement above when there is room", () => {
  const pos = getFixedMenuPosition({
    trigger: { top: 400, left: 200, right: 360, bottom: 436, width: 160, height: 36 },
    menu: { width: 160, height: 80 },
    viewport,
    align: "left",
    preferredPlacement: "above",
  });
  assert.equal(pos.openAbove, true);
  assert.equal(pos.top, 400 - 4 - 80);
});
