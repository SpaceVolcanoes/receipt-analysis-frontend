import { mount } from "@vue/test-utils";
import Api from "@/components/Api";
import Entry from "@/components/Entry.vue";

jest.mock("@/components/Api");

describe("Entry", () => {
  it("saves data from prop", () => {
    const entry = mount(Entry, {
      propsData: {
        initial: {
          name: "Mart",
          cost: 9
        }
      }
    });
    expect(entry.vm.cost).toBe(9);
    expect(entry.vm.name).toBe("Mart");
  });
});

describe("Entry", () => {
  it("sends update requests when data updated", async () => {
    const entry = mount(Entry, {
      propsData: {
        initial: {}
      }
    });
    await entry.setData({ id: 2 });
    Api.put.mockImplementation(() => Promise.resolve());

    await entry.setData({ name: "Jaak" });
    await entry.setData({ cost: 10 });

    const nameCall = Api.put.mock.calls[0];
    const costCall = Api.put.mock.calls[1];

    expect(nameCall[0]).toBe("/api/entries/2");
    expect(costCall[0]).toBe("/api/entries/2");

    expect(nameCall[1]["name"]).toBe("Jaak");
    expect(costCall[1]["cost"]).toBe(10);

    expect(entry.vm.name).toBe("Jaak");
    expect(entry.vm.cost).toBe(10);
  });
});

describe("Entry", () => {
  it("sends delete request when delete clicked", async () => {
    const entry = mount(Entry, {
      propsData: {
        initial: {}
      }
    });
    await entry.setData({ id: 2 });

    await entry.find("button").trigger("click");

    expect(Api.delete).toHaveBeenCalledWith("/api/entries/2");
  });
});
